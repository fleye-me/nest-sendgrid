/// <reference types="request" />
import { SendGridConfig } from "./interfaces/email.interface";
import { Attachment } from "./attachment";
export declare class SendGridService {
    private readonly sendGridConfig;
    constructor(sendGridConfig: SendGridConfig);
    sendMail(to: string, subject: string, html: string, cc?: string, attachments?: Attachment[]): Promise<[import("request").Response, {}]>;
    renderAndSendMail(to: string, subject: string, templatePath: string, data: any, cc?: string, attachments?: Attachment[]): Promise<[import("request").Response, {}]>;
    private send;
}
