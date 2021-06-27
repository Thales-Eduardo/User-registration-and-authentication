import IEmailProvider from '../methods/EmailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

class FakeEmailProvider implements IEmailProvider {
  private menssagem: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.menssagem.push(message);
  }
}

export default FakeEmailProvider;
