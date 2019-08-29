import { Module } from '@nestjs/common';
import { NestSendgridService } from './nest-sendgrid.service';

@Module({
  providers: [NestSendgridService],
  exports: [NestSendgridService],
})
export class NestSendgridModule {}
