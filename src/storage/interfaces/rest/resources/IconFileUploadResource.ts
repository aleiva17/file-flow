import { ApiProperty } from '@nestjs/swagger';

export class IconFileUploadResource {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}