import IPaserMailTemplateDTO from '../dtos/IPaserMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IPaserMailTemplateDTO): Promise<string>;
}
