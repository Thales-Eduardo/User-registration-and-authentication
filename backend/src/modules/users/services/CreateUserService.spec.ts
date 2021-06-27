import 'reflect-metadata';

import AppError from '@shared/errors/MsgError';
import FakeUsersRepository from '../repository/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUsersSevice from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUsersSevice: CreateUsersSevice;

describe('CreateUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUsersSevice = new CreateUsersSevice(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('deve ser capaz de criar um novo usuário', async () => {
    const user = await createUsersSevice.execute({
      name: 'thales',
      email: 'thalesdev22@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('não deve ser capaz de criar um novo usuário com o mesmo e-mail de outro usuário.', async () => {
    await createUsersSevice.execute({
      name: 'thales',
      email: 'thalesdev22@gmail.com',
      password: '123456',
    });

    await expect(
      createUsersSevice.execute({
        name: 'thales',
        email: 'thalesdev22@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
