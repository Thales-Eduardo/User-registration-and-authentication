import UserToken from '../infra/typeorm/model/UserToken';

export default interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>;
  FindByToken(token: string): Promise<UserToken | undefined>;
}
