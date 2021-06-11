import { injectable, inject } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authconfig from '@config/auth';
import User from '../infra/typeorm/model/User';
import MsgError from '@shared/errors/MsgError';

import IUserRepository from '../repository/IUserRepository';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
class AutenticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}
  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new MsgError('E-mail ou senha está incorreto', 401);
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      throw new MsgError('E-mail ou senha está incorreto', 401);
    }

    const { secret, expiresIn } = authconfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AutenticateUserService;
