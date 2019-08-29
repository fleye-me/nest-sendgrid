"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SendGridModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const sendgrid_service_1 = require("./sendgrid.service");
const sendgrid_constants_1 = require("./sendgrid.constants");
let SendGridModule = SendGridModule_1 = class SendGridModule {
    static register(emailConfig) {
        return {
            module: SendGridModule_1,
            providers: [
                {
                    provide: sendgrid_constants_1.SENDGRID_CONFIG,
                    useValue: emailConfig,
                },
            ],
        };
    }
    static registerAsync(options) {
        return {
            module: SendGridModule_1,
            imports: options.imports,
            providers: [
                ...this.createAsyncProviders(options),
                {
                    provide: sendgrid_constants_1.SENDGRID_CONFIG,
                    useFactory: (emailConfig) => emailConfig,
                    inject: [sendgrid_constants_1.SENDGRID_MODULE_OPTIONS],
                },
                ...(options.extraProviders || []),
            ],
        };
    }
    static createAsyncProviders(options) {
        if (options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        return [];
    }
    static createAsyncOptionsProvider(options) {
        return {
            provide: sendgrid_constants_1.SENDGRID_MODULE_OPTIONS,
            useFactory: options.useFactory,
            inject: options.inject || [],
        };
    }
};
SendGridModule = SendGridModule_1 = __decorate([
    common_1.Module({
        providers: [sendgrid_service_1.SendGridService],
        exports: [sendgrid_service_1.SendGridService],
    })
], SendGridModule);
exports.SendGridModule = SendGridModule;
