import 'reflect-metadata';

import FakeUsersRepository from '../repository/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeRefreshTokenRepository from '../repository/fakes/FakeRefreshTokenRepository';

import AuthenticateUserServis from './AuthenticateUserService';
import CreateUsersSevice from './CreateUserService';

import AppError from '@shared/errors/MsgError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeRefreshTokenRepository: FakeRefreshTokenRepository;

let createUsersSevice: CreateUsersSevice;
let authenticateUserServis: AuthenticateUserServis;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeRefreshTokenRepository = new FakeRefreshTokenRepository();

    createUsersSevice = new CreateUsersSevice(
      fakeUsersRepository,
      fakeHashProvider
    );

    authenticateUserServis = new AuthenticateUserServis(
      fakeUsersRepository,
      fakeHashProvider,
      fakeRefreshTokenRepository
    );
  });

  it('deve ser capaz de autenticar', async () => {
    const user = await createUsersSevice.execute({
      name: 'thales',
      email: 'thalesdev22@gmail.com',
      password: '123456',
    });

    const response = await authenticateUserServis.execute({
      email: 'thalesdev22@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('não deve ser capaz, de autenticar com um usuário não existente', async () => {
    await expect(
      authenticateUserServis.execute({
        email: 'thalesdev22@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser capaz de autenticar com a senha errada', async () => {
    await createUsersSevice.execute({
      name: 'thales',
      email: 'thalesdev22@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUserServis.execute({
        email: 'thalesdev22@gmail.com',
        password: '12345',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
