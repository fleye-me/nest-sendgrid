import { Test, TestingModule } from '@nestjs/testing';
import { NestSendgridService } from './nest-sendgrid.service';

describe('NestSendgridService', () => {
  let service: NestSendgridService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NestSendgridService],
    }).compile();

    service = module.get<NestSendgridService>(NestSendgridService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
