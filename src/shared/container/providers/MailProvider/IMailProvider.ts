export interface IEmailVariables {
  to: string;
  subject: string;
  variables: any;
  path: string
}

export interface IMailProvider {
  send(
   { to,
    subject,
    variables,
    path}: IEmailVariables
  ): Promise<void>;
}