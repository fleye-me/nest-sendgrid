import { Injectable, Inject } from '@nestjs/common';
import { SENDGRID_CONFIG } from './sendgrid.constants';
import { SendGridConfig } from './interfaces/email.interface';
import * as Sendgrid from '@sendgrid/mail';


@Injectable()
export class SendGridService {
  constructor(
    @Inject(SENDGRID_CONFIG) private readonly sendGridConfig: SendGridConfig,
  ) {
    Sendgrid.setApiKey(this.sendGridConfig.sendgridApiKey);
    console.log("@@@@@@@@@@@@@@@");
    console.log(this.sendGridConfig);
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
}
