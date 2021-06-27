import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/MsgError';

import IUserRepository from '../repository/IUserRepository';
import IUserTokensRepository from '../repository/UserTokensRepository';
import IHashProvider from '../providers/HashProvider/methods/HashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.FindByToken(token);

    if (!userToken) {
      throw new AppError('Esse token do usuário não existe');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('Esse usuário não existe');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 1);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}
export default SendForgotPasswordEmailService;
