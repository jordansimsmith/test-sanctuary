import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class FilesService {
  saveFile(file: FileUpload): Promise<string> {
    const fileKey = `./uploads/${file.filename}`;

    return new Promise<string>((resolve, reject) =>
      file
        .createReadStream()
        .pipe(createWriteStream(fileKey))
        .on('finish', () => resolve(fileKey))
        .on('error', () => reject()),
    );
  }
}
