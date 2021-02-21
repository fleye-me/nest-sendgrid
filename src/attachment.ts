import * as stream from 'stream';

interface AttachmentFields {
  content: string;
  type: string;
  filename: string;
}

export class Attachment {
  content: stream.Readable;
  mimeType: string;
  filename: string;

  constructor(content: stream.Readable, mimeType: string, filename: string) {
    this.content = content;
    this.mimeType = mimeType;
    this.filename = filename;
  }

  toObject = (): AttachmentFields => {
    const buffer = Buffer.from(this.content.toString());
    return {
      content: buffer.toString('base64'),
      type: this.mimeType,
      filename: this.filename,
    };
  };
}
