import {
  Controller, Delete,
  Get,
  Inject,
  Param,
  Post, Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse, ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { IconQueryService } from '@app/storage/domain/services/IconQueryService';
import { IconFileUploadResource } from '@app/storage/interfaces/rest/resources/IconFileUploadResource';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { IconCommandService } from '@app/storage/domain/services/IconCommandService';
import { BaseResponse } from '@app/shared/domain/service/communication/BaseResponse';

@ApiTags('Icons')
@Controller('/api/v1/icons')
export class IconsController {
  constructor(
    @Inject(IconQueryService) private readonly iconQueryService: IconQueryService,
    @Inject(IconCommandService) private readonly iconCommandService: IconCommandService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all the icons file names.' })
  @ApiOkResponse({ description: 'List retrieved successfully.' })
  async getAll() {
    return await this.iconQueryService.getIconsFileNames();
  }

  @Get(':fileName')
  @ApiOperation({ summary: "Get a specific icon image by it's file name." })
  @ApiOkResponse({ description: 'Icon retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Icon file not found.' })
  async getByFileName(@Param('fileName') fileName: string, @Res() res: Response) {
    return res.sendFile(await this.iconQueryService.getIconUrlByFileName(fileName));
  }

  @Post()
  @ApiOperation({ summary: 'Upload an icon image.' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Icon image',
    type: IconFileUploadResource,
  })
  @ApiConflictResponse({ description: 'A file with the same name already exists.' })
  @ApiCreatedResponse({ description: 'File uploaded successfully.', type: BaseResponse<string> })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.iconCommandService.uploadIcon(file);
  }

  @Put(':fileName')
  @ApiOperation({ summary: 'Update an existing icon image.' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Icon image',
    type: IconFileUploadResource,
  })
  @ApiNotFoundResponse({ description: 'Icon file not found.' })
  @ApiOkResponse({ description: 'File updated successfully.', type: BaseResponse<string> })
  async updateFile(@Param('fileName') fileName: string, @UploadedFile() file: Express.Multer.File) {
    return await this.iconCommandService.updateIconWithFileName(fileName, file);
  }

  @Delete(':fileName')
  @ApiOperation({ summary: "Delete a specific icon image by it's file name." })
  @ApiOkResponse({ description: 'Icon image deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Icon file not found.' })
  async deleteFile(@Param('fileName') fileName: string) {
    return await this.iconCommandService.deleteIconByFileName(fileName);
  }
}
