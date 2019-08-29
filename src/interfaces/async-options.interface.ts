import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { SendGridConfig } from './email.interface';

export interface SendGridModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<SendGridConfig> | SendGridConfig;
  inject?: any[];
  extraProviders?: Provider[];
}
