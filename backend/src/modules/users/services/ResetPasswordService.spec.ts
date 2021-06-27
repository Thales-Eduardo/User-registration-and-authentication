import 'reflect-metadata';

import AppError from '@shared/errors/MsgError';

import FakeUsersRepository from '../repository/fakes/FakeUserRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeUserTokensRepository from '../repository/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider
    );
  });

  it('deve ser capaz de redefinir a senha', async () => {
    const user = await fakeUsersRepository.create({
      name: 'thales',
      email: 'thalesdev22@gmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      password: '123123',
      token,
    });

    const updateUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updateUser?.password).toBe('123123');
  });

  it('não deve ser capaz de redefinir a senha com token não existente', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'não existe',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser capaz de redefinir a senha com um usuário não existente', async () => {
    const { token } = await fakeUserTokensRepository.generate('user');

    await expect(
      resetPasswordService.execute({
        token,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser capaz de redefinir a senha se passou mais de 1 hora', async () => {
    const user = await fakeUsersRepository.create({
      name: 'thales',
      email: 'thalesdev22@gmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementation(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: '123123',
        token,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
