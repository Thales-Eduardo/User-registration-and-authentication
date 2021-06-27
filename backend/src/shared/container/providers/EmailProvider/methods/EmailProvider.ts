import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IEmailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
