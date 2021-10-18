import { inject, injectable } from 'tsyringe';
import dayjs from 'dayjs';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppErrors from '@shared/errors/MsgError';
import { IRefreshTokenRepository } from '../repository/IRefreshTokenRepository';

@injectable()
class RefreshTokenUserServices {
  constructor(
    @inject('RefreshTokenRepository')
    private refreshToken: IRefreshTokenRepository
  ) {}

  public async execute(id: string) {
    const user = await this.refreshToken.findById(id);

    if (!user) {
      throw new AppErrors('Refresh token invalid');
    }

    const { secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.user_id,
      expiresIn: '1d',
    });

    const expired = dayjs().isAfter(dayjs.unix(user.expiresIn));
    if (expired) {
      await this.refreshToken.generateRefreshToken(user.user_id);
    }

    return token;
  }
}

export default RefreshTokenUserServices;
