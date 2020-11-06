"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Attachment {
    constructor(content, mimeType, filename) {
        this.toObject = () => {
            const buffer = Buffer.from(this.content.toString());
            return {
                content: buffer.toString('base64'),
                type: this.mimeType,
                filename: this.filename
            };
        };
        this.content = content;
        this.mimeType = mimeType;
        this.filename = filename;
    }
}
exports.Attachment = Attachment;
