import { Global, Module } from '@nestjs/common';
import { MinioController } from './minio.controller';
import * as Minio from 'minio';

@Global()
@Module({
  providers: [
    {
      provide: 'MINIO_CLIENT',
      async useFactory() {
        const client = new Minio.Client({
          endPoint: 'localhost',
          port: 9000,
          useSSL: false,
          accessKey: '', //在minio中生成临时签名
          secretKey: '',
        });
        return client;
      },
    },
  ],

  exports: ['MINIO_CLIENT'],

  controllers: [MinioController],
})
export class MinioModule {}
