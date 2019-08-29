import { SendGridConfig } from './interfaces/email.interface';
export declare class SendGridService {
    private readonly sendGridConfig;
    constructor(sendGridConfig: SendGridConfig);
}
