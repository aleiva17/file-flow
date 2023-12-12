import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IconFileUploadCommand } from '@app/storage/domain/model/commands/IconFileUploadCommand';
import { ConflictException, Inject } from '@nestjs/common';
import { IconRepository } from '@app/storage/domain/repositories/IconRepository';
import { BaseResponse } from '@app/shared/domain/service/communication/BaseResponse';

@CommandHandler(IconFileUploadCommand)
export class IconFileUploadCommandHandler implements ICommandHandler<IconFileUploadCommand> {
  constructor(@Inject(IconRepository) private repository: IconRepository) {}

  async execute(command: IconFileUploadCommand): Promise<BaseResponse<string>> {
    const { file } = command;

    if (await this.repository.existsByFileName(file.originalname)) {
      throw new ConflictException(`A file with the name: '${file.originalname}' already exists.`);
    }

    try {
      await this.repository.save(file);
      return new BaseResponse<string>({ resource: file.originalname, message: 'File uploaded successfully' });
    } catch (error) {
      return new BaseResponse<string>({ message: error });
    }
  }
}