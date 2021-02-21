import { Module, DynamicModule, Provider } from "@nestjs/common";
import { SendGridService } from "./sendgrid.service";
import { SendGridConfig } from "./interfaces/email.interface";
import { SendGridModuleAsyncOptions } from "./interfaces/async-options.interface";
import { SENDGRID_CONFIG, SENDGRID_MODULE_OPTIONS } from "./sendgrid.constants";

@Module({
  providers: [SendGridService],
  exports: [SendGridService],
})
export class SendGridModule {
  static register(emailConfig: SendGridConfig): DynamicModule {
    return {
      module: SendGridModule,
      providers: [
        {
          provide: SENDGRID_CONFIG,
          useValue: emailConfig,
        },
      ],
    };
  }

  static registerAsync(options: SendGridModuleAsyncOptions): DynamicModule {
    return {
      module: SendGridModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options),
        {
          provide: SENDGRID_CONFIG,
          useFactory: (emailConfig: SendGridConfig) => emailConfig,
          inject: [SENDGRID_MODULE_OPTIONS],
        },
        ...(options.extraProviders || []),
      ],
    };
  }

  private static createAsyncProviders(
    options: SendGridModuleAsyncOptions
  ): Provider[] {
    if (options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [];
  }

  private static createAsyncOptionsProvider(
    options: SendGridModuleAsyncOptions
  ): Provider {
    return {
      provide: SENDGRID_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }
}
