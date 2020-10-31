import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { Credentials, S3 } from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {
  private readonly s3client: S3;

  constructor() {
    this.s3client = new S3({
      credentials: new Credentials({
        accessKeyId: 'jordan',
        secretAccessKey: 'applesoranges',
      }),
      endpoint: 'http://localhost:9000',
      s3ForcePathStyle: true,
      signatureVersion: 'v4',
    });
  }

  async uploadTest(file: FileUpload, institutionId: string): Promise<string> {
    if (file.mimetype !== 'application/pdf') {
      throw new Error('Uploaded test file must be of type application/pdf');
    }

    const objKey = `${institutionId}/tests/${uuid()}.pdf`;

    const params: PutObjectRequest = {
      Bucket: 'test-sanctuary',
      Key: objKey,
      Body: file.createReadStream(),
      ContentType: file.mimetype,
    };

    await this.s3client.upload(params).promise();

    return objKey;
  }
}
