import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { Credentials, S3 } from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilesService {
  private readonly s3client: S3;
  private readonly configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;

    this.s3client = new S3({
      credentials: new Credentials({
        accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get<string>('AWS_SECRET_KEY'),
      }),
      endpoint: configService.get<string | undefined>('AWS_S3_ENDPOINT'),
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
      Bucket: this.configService.get<string>('AWS_S3_BUCKET'),
      Key: objKey,
      Body: file.createReadStream(),
      ContentType: file.mimetype,
    };

    await this.s3client.upload(params).promise();

    return objKey;
  }

  getDownloadLink(objKey: string): Promise<string> {
    const params = {
      Bucket: this.configService.get<string>('AWS_S3_BUCKET'),
      Key: objKey,
    };

    return this.s3client.getSignedUrlPromise('getObject', params);
  }
}
