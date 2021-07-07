import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/model/User';
import MsgError from '@shared/errors/MsgError';

import IUserRepository from '../repository/IUserRepository';
import IHashProvider from '../providers/HashProvider/methods/HashProvider';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  oldPassword?: string;
  newPassword?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    user_id,
    name,
    email,
    oldPassword,
    newPassword,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new MsgError('Esse usuário não existe!', 403);
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new MsgError('Esse e-mail já esta em uso!', 403);
    }

    user.name = name;
    user.email = email;

    if (newPassword && !oldPassword) {
      throw new MsgError(
        'para atualizar sua senha, informe seu antigo password!'
      );
    }

    if (newPassword && oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password
      );

      if (!checkOldPassword) {
        throw new MsgError(
          'para atualizar sua senha, informe seu antigo password correto!'
        );
      }

      user.password = await this.hashProvider.generateHash(newPassword);
    }

    return await this.usersRepository.save(user);
  }
}
export default UpdateProfileService;
