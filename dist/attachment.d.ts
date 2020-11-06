/// <reference types="node" />
import * as stream from 'stream';
interface AttachmentFields {
    content: string;
    type: string;
    filename: string;
}
export declare class Attachment {
    content: stream.Readable;
    mimeType: string;
    filename: string;
    constructor(content: stream.Readable, mimeType: string, filename: string);
    toObject: () => AttachmentFields;
}
export {};
