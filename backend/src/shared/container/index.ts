import { container } from 'tsyringe';

//provedores do users
import '@modules/users/providers';
import './providers';

//User
import IUserRepository from '@modules/users/repository/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repository/UserRepository';
import IUserTokensRepository from '@modules/users/repository/UserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repository/UserTokensRepository';
import { IRefreshTokenRepository } from '@modules/users/repository/IRefreshTokenRepository';
import RefreshTokenRepository from '@modules/users/infra/typeorm/repository/RefreshTokenRepository';

//---

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
);
container.registerSingleton<IRefreshTokenRepository>(
  'RefreshTokenRepository',
  RefreshTokenRepository
);
