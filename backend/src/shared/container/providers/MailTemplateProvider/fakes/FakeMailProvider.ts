import IMailTemplateProvider from '../methods/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return '';
  }
}

export default FakeMailTemplateProvider;
