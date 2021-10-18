import { injectable, inject } from 'tsyringe';
import HashProvider from '../providers/HashProvider/methods/HashProvider';
import { sign } from 'jsonwebtoken';

import authconfig from '@config/auth';
import User from '../infra/typeorm/model/User';
import RefreshToken from '../infra/typeorm/model/RefreshToken';
import MsgError from '@shared/errors/MsgError';

import IUserRepository from '../repository/IUserRepository';
import { IRefreshTokenRepository } from '../repository/IRefreshTokenRepository';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
  refreshToken: RefreshToken;
}

@injectable()
class AutenticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: HashProvider,

    @inject('RefreshTokenRepository')
    private refreshToken: IRefreshTokenRepository
  ) {}
  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new MsgError('E-mail ou senha está incorreto', 401);
    }

    const comparePassword = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!comparePassword) {
      throw new MsgError('E-mail ou senha está incorreto', 401);
    }

    const { secret, expiresIn } = authconfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const refreshToken = await this.refreshToken.generateRefreshToken(user.id);

    return {
      user,
      token,
      refreshToken,
    };
  }
}

export default AutenticateUserService;
