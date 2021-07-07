import 'reflect-metadata';

import AppError from '@shared/errors/MsgError';
import FakeUsersRepository from '../repository/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('deve ser capaz de atualizar o perfil', async () => {
    const user = await fakeUsersRepository.create({
      name: 'thales',
      email: 'thalesdev22@gmail.com',
      password: '123456',
    });

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'mutcha22',
      email: 'thalesdev@gmail.com',
    });

    expect(updateUser.name).toBe('mutcha22');
    expect(updateUser.email).toBe('thalesdev@gmail.com');
  });

  it('Não deve ser capaz de atualizar o perfil de um usuário que não existe.', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'qualquer-id',
        name: 'sla',
        email: 'test@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de mudar o e-mail se for igual de outro usuário.', async () => {
    await fakeUsersRepository.create({
      name: 'thales',
      email: 'thalesdev22@gmail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'thales',
      email: 'thalesdev@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'mutcha22',
        email: 'thalesdev22@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'thales',
      email: 'thalesdev22@gmail.com',
      password: '123456',
    });

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'mutcha22',
      email: 'thalesdev@gmail.com',
      oldPassword: '123456',
      newPassword: '123123',
    });

    expect(updateUser.password).toBe('123123');
  });

  it('Não deve ser capaz de atualizar a senha sem a senha antiga.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'thales',
      email: 'thalesdev22@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'mutcha22',
        email: 'thalesdev@gmail.com',
        newPassword: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('não deve ser capaz de atualizar a senha com a senha antiga errada ', async () => {
    const user = await fakeUsersRepository.create({
      name: 'thales',
      email: 'thalesdev22@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'mutcha22',
        email: 'thalesdev@gmail.com',
        oldPassword: 'senha-errada',
        newPassword: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
