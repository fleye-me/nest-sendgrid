import { SendGridConfig } from './interfaces/email.interface';
export declare class SendGridService {
    private readonly sendGridConfig;
    constructor(sendGridConfig: SendGridConfig);
    sendMail(to: string, subject: string, html: string): Promise<[any, {}]>;
    renderAndSendMail(to: string, subject: string, templatePath: string, data: any): Promise<[any, {}]>;
    private send;
}
