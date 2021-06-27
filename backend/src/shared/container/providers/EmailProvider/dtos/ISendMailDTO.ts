import IPaserMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IPaserMailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  tempalte: IPaserMailTemplateDTO;
}
