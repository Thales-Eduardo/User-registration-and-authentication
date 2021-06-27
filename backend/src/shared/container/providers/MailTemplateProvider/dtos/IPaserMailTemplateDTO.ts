interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IPaserMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}
