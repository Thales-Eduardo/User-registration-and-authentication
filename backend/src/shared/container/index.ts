import { container } from 'tsyringe';

import IUserRepository from '@modules/users/repository/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repository/UserRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
