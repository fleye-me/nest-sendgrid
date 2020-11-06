"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const sendgrid_constants_1 = require("./sendgrid.constants");
const Sendgrid = require("@sendgrid/mail");
const Mustache = require("mustache");
const fs_1 = require("fs");
let SendGridService = class SendGridService {
    constructor(sendGridConfig) {
        this.sendGridConfig = sendGridConfig;
        Sendgrid.setApiKey(this.sendGridConfig.sendgridApiKey);
    }
    sendMail(to, subject, html, attachments) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.send(to, subject, html, attachments);
        });
    }
    renderAndSendMail(to, subject, templatePath, data, attachments) {
        return __awaiter(this, void 0, void 0, function* () {
            const template = fs_1.readFileSync(templatePath, 'utf8');
            const output = Mustache.render(template, data);
            return yield this.send(to, subject, output, attachments);
        });
    }
    send(to, subject, html, attachments) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.sendGridConfig.devOptions) {
                if (this.sendGridConfig.devOptions.disableSend) {
                    return;
                }
                if (this.sendGridConfig.devOptions.defaultDestinyAddress) {
                    to = this.sendGridConfig.devOptions.defaultDestinyAddress;
                }
            }
            try {
                return yield Sendgrid.send({
                    to,
                    from: this.sendGridConfig.sendgridEmailFrom,
                    subject,
                    html,
                    attachments: attachments.map(a => a.toObject())
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
SendGridService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(sendgrid_constants_1.SENDGRID_CONFIG)),
    __metadata("design:paramtypes", [Object])
], SendGridService);
exports.SendGridService = SendGridService;
