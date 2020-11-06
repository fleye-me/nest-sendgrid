import { SendGridConfig } from './interfaces/email.interface';
import { Attachment } from './attachment';
export declare class SendGridService {
    private readonly sendGridConfig;
    constructor(sendGridConfig: SendGridConfig);
    sendMail(to: string, subject: string, html: string, attachments?: Attachment[]): Promise<[any, {}]>;
    renderAndSendMail(to: string, subject: string, templatePath: string, data: any, attachments?: Attachment[]): Promise<[any, {}]>;
    private send;
}
