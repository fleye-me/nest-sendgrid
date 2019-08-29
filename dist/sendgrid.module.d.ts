import { DynamicModule } from '@nestjs/common';
import { SendGridConfig } from './interfaces/email.interface';
import { SendGridModuleAsyncOptions } from './interfaces/async-options.interface';
export declare class SendGridModule {
    static register(emailConfig: SendGridConfig): DynamicModule;
    static registerAsync(options: SendGridModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
