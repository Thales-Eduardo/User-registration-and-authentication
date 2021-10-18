import { v4 as uuid } from 'uuid';

import { IRefreshTokenRepository } from '@modules/users/repository/IRefreshTokenRepository';

import RefreshToken from '../../infra/typeorm/model/RefreshToken';

class FakeRefreshTokenRepository implements IRefreshTokenRepository {
  private token: RefreshToken[] = [];

  public async generateRefreshToken(userId: string): Promise<RefreshToken> {
    const refreshToken = new RefreshToken();

    const tokenId = this.token.find(itens => itens.user_id === userId);

    if (tokenId) {
      this.token.splice(0, this.token.length);
    }

    refreshToken.id = uuid();
    refreshToken.user_id = userId;
    refreshToken.expiresIn = 1634577600;

    this.token.push(refreshToken);

    return refreshToken;
  }

  public async findById(id: string): Promise<RefreshToken | undefined> {
    return this.token.find(itens => itens.id === id);
  }
}

export default FakeRefreshTokenRepository;
