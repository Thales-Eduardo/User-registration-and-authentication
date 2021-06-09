import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authconfig from '../config/auth';
import Users from '../models/User';
import MsgError from '../errors/MsgError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: Users;
  token: string;
}

class AutenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(Users);

    const user = await userRepository.findOne({ where: { email } });

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
