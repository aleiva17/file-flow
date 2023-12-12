import { IconCommandService } from '@app/storage/domain/services/IconCommandService';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IconFileUploadCommand } from '@app/storage/domain/model/commands/IconFileUploadCommand';
import { DeleteIconByFileNameCommand } from '@app/storage/domain/model/commands/DeleteIconByFileNameCommand';
import { BaseResponse } from '@app/shared/domain/service/communication/BaseResponse';

@Injectable()
export class IconCommandServiceImpl implements IconCommandService {
  constructor(private readonly commandBus: CommandBus) {}

  async uploadIcon(icon: Express.Multer.File) {
    return await this.commandBus.execute(
      new IconFileUploadCommand(icon)
    );
  }

  async deleteIconByFileName(fileName:string) {
    return await this.commandBus.execute(
      new DeleteIconByFileNameCommand(fileName)
    );
  }

  async updateIconWithFileName(fileName: string, newIcon: Express.Multer.File) {
    await this.commandBus.execute(new DeleteIconByFileNameCommand(fileName));
    newIcon.originalname = fileName;
    return await this.commandBus.execute(new IconFileUploadCommand(newIcon));
  }
}