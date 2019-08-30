import { Injectable, Inject } from '@nestjs/common';
import { SENDGRID_CONFIG } from './sendgrid.constants';
import { SendGridConfig } from './interfaces/email.interface';
import * as Sendgrid from '@sendgrid/mail';
import * as Mustache from 'mustache';


@Injectable()
export class SendGridService {
  constructor(
    @Inject(SENDGRID_CONFIG) private readonly sendGridConfig: SendGridConfig,
  ) {
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
    var view = {
      title: "Joe",
      calc: function () {
        return 2 + 4;
      }
    };
    const output = Mustache.render("{{title}} spends {{calc}}", view);
    console.log(output);
    try {
      return await Sendgrid.send({
        to,
        from: this.sendGridConfig.sendgridEmailFrom,
        subject,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
