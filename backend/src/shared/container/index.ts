import { container } from 'tsyringe';

//provedores do users
import '@modules/users/providers';

import IUserRepository from '@modules/users/repository/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repository/UserRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
