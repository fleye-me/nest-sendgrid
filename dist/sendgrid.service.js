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
const fs = require("fs");
let SendGridService = class SendGridService {
    constructor(sendGridConfig) {
        this.sendGridConfig = sendGridConfig;
        console.log('proccess: ', process.cwd());
        console.log('dirname: ', __dirname);
        Sendgrid.setApiKey(this.sendGridConfig.sendgridApiKey);
    }
    sendMail(to, subject, html) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Sendgrid.send({
                    to,
                    from: this.sendGridConfig.sendgridEmailFrom,
                    subject,
                    html,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    renderAndSendMail(to, subject, templatePath, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const template = fs.readFileSync('./src/resources/situation-email2.html', 'utf8');
            data = {
                status: 'em suspeita',
                imei: '12123',
                vehicle: 'abc123',
                companyName: 'EMrpesa 1',
                signal: '50%',
                battery: 'bateria',
                statusColor: '#ffd33d',
                isRfOn: 'Ligado',
            };
            const output = Mustache.render(template, data);
            console.log(output);
            try {
                return yield Sendgrid.send({
                    to: 'joao.schaab@sthima.com.br',
                    from: this.sendGridConfig.sendgridEmailFrom,
                    subject,
                    html: output,
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
