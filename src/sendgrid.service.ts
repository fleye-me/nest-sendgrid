import { Injectable, Inject } from '@nestjs/common';
import { SENDGRID_CONFIG } from './sendgrid.constants';
import { SendGridConfig } from './interfaces/email.interface';
import * as Sendgrid from '@sendgrid/mail';
import * as Mustache from 'mustache';
import { readFileSync } from 'fs';


@Injectable()
export class SendGridService {
  constructor(
    @Inject(SENDGRID_CONFIG) private readonly sendGridConfig: SendGridConfig,
  ) {
    Sendgrid.setApiKey(this.sendGridConfig.sendgridApiKey);
  }

  async sendMail(to: string, subject: string, html: string) {
    return await this.send(to, subject, html);
  }

  async renderAndSendMail(to: string, subject: string, templatePath: string, data: any) {
    const template = readFileSync(templatePath, 'utf8');
    const output = Mustache.render(template, data);
    return await this.send(to, subject, output);
  }

  private async send(to: string, subject: string, html: string) {
    if(this.sendGridConfig.devOptions) {
      if (this.sendGridConfig.devOptions.disableSend) {
        return;
      }
      if(this.sendGridConfig.devOptions.defaultDestinyAddress) {
        to = this.sendGridConfig.devOptions.defaultDestinyAddress;
      }
    }
    try {
      return await Sendgrid.send({
        to,
        from: this.sendGridConfig.sendgridEmailFrom,
        subject,
        html,
      });
    } catch (error) {
      console.log(error);
    }
  }

}
