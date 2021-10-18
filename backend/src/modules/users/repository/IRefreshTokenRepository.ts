import RefreshToken from '../infra/typeorm/model/RefreshToken';

export interface IRefreshTokenRepository {
  generateRefreshToken(userId: string): Promise<RefreshToken>;
  findById(id: string): Promise<RefreshToken | undefined>;
}
