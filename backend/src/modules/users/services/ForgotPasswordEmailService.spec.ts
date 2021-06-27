import 'reflect-metadata';

import AppError from '@shared/errors/MsgError';

import FakeUsersRepository from '../repository/fakes/FakeUserRepository';
import ForgotPasswordEmailService from './ForgotPasswordEmailService';
import FakeEmailProvider from '@shared/container/providers/EmailProvider/fakes/FakeEmailProvider';
import FakeUserTokensRepository from '../repository/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeEmailProvider: FakeEmailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let ForgotPasswordEmail: ForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeEmailProvider = new FakeEmailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    ForgotPasswordEmail = new ForgotPasswordEmailService(
      fakeUsersRepository,
      fakeEmailProvider,
      fakeUserTokensRepository
    );
  });

  it('deve ser capaz de recuperar a senha usando o e-mail', async () => {
    const sendMail = jest.spyOn(fakeEmailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'thales',
      email: 'thalesdev22@gmail.com',
      password: '123456',
    });

    await ForgotPasswordEmail.execute({
      email: 'thalesdev22@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('não deve ser capaz de recuperar uma senha de usuário inexistente', async () => {
    await expect(
      ForgotPasswordEmail.execute({
        email: 'thalesdev22@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('deve gerar um token, para recuperação de senha', async () => {
    const generate = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'thales',
      email: 'thalesdev22@gmail.com',
      password: '123456',
    });

    await ForgotPasswordEmail.execute({
      email: 'thalesdev22@gmail.com',
    });

    expect(generate).toHaveBeenCalledWith(user.id);
  });
});

//let fakeUsersRepository: IFakeUsersRepository; se tiver new os dados persisti na memoria ram
