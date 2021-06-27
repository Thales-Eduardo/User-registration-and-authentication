import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import IEmailProvider from '../methods/EmailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/methods/IMailTemplateProvider';

@injectable()
class EtherealMailProvider implements IEmailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
      // console.log(account);
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    tempalte,
  }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Thales-Eduardo',
        address: from?.email || 'thalesdev22@gmail.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(tempalte),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealMailProvider;
