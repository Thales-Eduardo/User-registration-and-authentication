import handlebars from 'handlebars';
import fs from 'fs';

import IMailTemplateProvider from '../methods/IMailTemplateProvider';
import IPaserMailTemplateDTO from '../dtos/IPaserMailTemplateDTO';

class HandlebarsMailProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IPaserMailTemplateDTO): Promise<string> {
    const fileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(fileContent);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailProvider;
