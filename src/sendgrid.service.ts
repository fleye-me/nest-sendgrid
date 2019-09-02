import { Injectable, Inject } from '@nestjs/common';
import { SENDGRID_CONFIG } from './sendgrid.constants';
import { SendGridConfig } from './interfaces/email.interface';
import * as Sendgrid from '@sendgrid/mail';
import * as Mustache from 'mustache';
import * as fs from 'fs';


@Injectable()
export class SendGridService {
  constructor(
    @Inject(SENDGRID_CONFIG) private readonly sendGridConfig: SendGridConfig,
  ) {
    console.log('proccess: ', process.cwd());
    console.log('dirname: ', __dirname);
    Sendgrid.setApiKey(this.sendGridConfig.sendgridApiKey);
  }

  async sendMail(to: string, subject: string, html: string) {
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

  async renderAndSendMail(to: string, subject: string, templatePath: string, data: any) {
    const template = fs.readFileSync(templatePath, 'utf8');
    const output = Mustache.render(template, data);
    try {
      return await Sendgrid.send({
        to,
        from: this.sendGridConfig.sendgridEmailFrom,
        subject,
        html: output,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
