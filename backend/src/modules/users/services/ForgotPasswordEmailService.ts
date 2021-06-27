import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/MsgError';

import IUserRepository from '../repository/IUserRepository';
import EmailProvider from '@shared/container/providers/EmailProvider/methods/EmailProvider';
import IUserTokensRepository from '../repository/UserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class ForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: EmailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Esse usuário não existe');
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgotPassword.hbs'
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Recuperação de senha',
      tempalte: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}
export default ForgotPasswordEmailService;
