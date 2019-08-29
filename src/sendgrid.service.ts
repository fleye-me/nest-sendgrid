import { Injectable, Inject } from '@nestjs/common';
import { SENDGRID_CONFIG } from './sendgrid.constants';
import { SendGridConfig } from './interfaces/email.interface';

@Injectable()
export class SendGridService {
  constructor(
    @Inject(SENDGRID_CONFIG) private readonly sendGridConfig: SendGridConfig,
  ) {
    console.log("@@@@@@@@@@@@@@@");
    console.log(this.sendGridConfig);
  }
}
