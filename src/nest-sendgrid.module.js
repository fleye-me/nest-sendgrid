"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var nest_sendgrid_service_1 = require("./nest-sendgrid.service");
var NestSendgridModule = /** @class */ (function () {
    function NestSendgridModule() {
    }
    NestSendgridModule = __decorate([
        common_1.Module({
            providers: [nest_sendgrid_service_1.NestSendgridService],
            exports: [nest_sendgrid_service_1.NestSendgridService]
        })
    ], NestSendgridModule);
    return NestSendgridModule;
}());
exports.NestSendgridModule = NestSendgridModule;
