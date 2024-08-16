import { Controller, Get, Inject, Query } from '@nestjs/common';
import * as Minio from 'minio';

@Controller('minio')
export class MinioController {
  @Inject('MINIO_CLIENT')
  private minioClient: Minio.Client;

  //   利用minio生成临时签名
  @Get('presignedUrl')
  presignedPutObject(@Query('name') name: string) {
    // buckectName/objectName/expires
    return this.minioClient.presignedPutObject('chat-room', name, 3600);
  }
}
