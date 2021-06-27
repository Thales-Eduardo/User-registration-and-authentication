import { container } from 'tsyringe';

//provedores do users
import '@modules/users/providers';
import './providers';

import IUserRepository from '@modules/users/repository/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repository/UserRepository';

//UserTokens
import IUserTokensRepository from '@modules/users/repository/UserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repository/UserTokensRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
);
