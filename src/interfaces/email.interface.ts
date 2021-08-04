export interface SendGridConfig {
  readonly sendgridApiKey: string;
  readonly sendgridEmailFrom: string;
  readonly devOptions?: {
    disableSend: boolean;
    defaultDestinyAddress: string;
  };
}
