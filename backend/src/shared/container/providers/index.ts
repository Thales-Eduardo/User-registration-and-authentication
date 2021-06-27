import { container } from 'tsyringe';

import IEmailProvider from './EmailProvider/methods/EmailProvider';
import EtherealMailProvider from './EmailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/methods/IMailTemplateProvider';
import HandlebarsMailProvider from './MailTemplateProvider/implementations/HandlebarsMailProvider';

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailProvider
);

container.registerInstance<IEmailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider)
);
