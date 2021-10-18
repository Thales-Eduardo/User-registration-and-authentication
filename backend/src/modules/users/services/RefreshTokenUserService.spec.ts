import 'reflect-metadata';

import FakeUsersRepository from '../repository/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeRefreshTokenRepository from '../repository/fakes/FakeRefreshTokenRepository';

import RefreshTokenUserService from './RefreshTokenUserService';
import CreateUsersSevice from './CreateUserService';

import AppError from '@shared/errors/MsgError';

let fakeRefreshTokenRepository: FakeRefreshTokenRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let refreshTokenUserService: RefreshTokenUserService;
let createUsersSevice: CreateUsersSevice;

describe('refreshTokenUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeRefreshTokenRepository = new FakeRefreshTokenRepository();

    refreshTokenUserService = new RefreshTokenUserService(
      fakeRefreshTokenRepository
    );

    createUsersSevice = new CreateUsersSevice(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('deve ser capaz de gerar um novo token', async () => {
    const res = await fakeRefreshTokenRepository.generateRefreshToken('1');
    const response = await refreshTokenUserService.execute(res.id);
    expect(response).toBe(response);
  });

  it('não deve ser capaz de gerar um novo token', async () => {
    await expect(refreshTokenUserService.execute('2')).rejects.toBeInstanceOf(
      AppError
    );
  });
});
