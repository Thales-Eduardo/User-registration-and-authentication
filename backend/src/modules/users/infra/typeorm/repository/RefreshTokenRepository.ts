import { getRepository, Repository } from 'typeorm';
import dayjs from 'dayjs';

import { IRefreshTokenRepository } from '@modules/users/repository/IRefreshTokenRepository';

import RefreshToken from '../model/RefreshToken';

class RefreshTokenRepository implements IRefreshTokenRepository {
  private ormRepository: Repository<RefreshToken>;

  constructor() {
    this.ormRepository = getRepository(RefreshToken);
  }

  public async generateRefreshToken(userId: string): Promise<RefreshToken> {
    const userById = await this.ormRepository.findOne({
      where: { user_id: userId },
    });

    if (userById) {
      await this.ormRepository.remove(userById);
    }

    const expire = dayjs().add(1, 'day').unix();

    const user = this.ormRepository.create({
      expiresIn: expire,
      user_id: userId,
    });

    return await this.ormRepository.save(user);
  }

  public async findById(id: string): Promise<RefreshToken | undefined> {
    return await this.ormRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}

export default RefreshTokenRepository;
