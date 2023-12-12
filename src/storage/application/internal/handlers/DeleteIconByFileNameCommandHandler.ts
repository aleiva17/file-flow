import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteIconByFileNameCommand } from '@app/storage/domain/model/commands/DeleteIconByFileNameCommand';
import { Inject, NotFoundException } from '@nestjs/common';
import { IconRepository } from '@app/storage/domain/repositories/IconRepository';
import { BaseResponse } from '@app/shared/domain/service/communication/BaseResponse';

@CommandHandler(DeleteIconByFileNameCommand)
export class DeleteIconByFileNameCommandHandler implements ICommandHandler<DeleteIconByFileNameCommand> {
  constructor(@Inject(IconRepository) private repository: IconRepository) {}

  async execute(command: DeleteIconByFileNameCommand): Promise<BaseResponse<string>> {
    const { fileName } = command;

    if (!(await this.repository.existsByFileName(fileName))) {
      throw new NotFoundException(`File: '${fileName}' not found.`)
    }

    try {
      await this.repository.deleteByFileName(fileName);
      return new BaseResponse<string>({ resource: fileName, message: 'File deleted successfully' });
    } catch (error) {
      return new BaseResponse<string>({ message: error });
    }
  }
}