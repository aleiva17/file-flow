import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetIconUrlByFileNameQuery } from '@app/storage/domain/model/queries/GetIconUrlByFileNameQuery';
import { Inject, NotFoundException } from '@nestjs/common';
import { IconRepository } from '@app/storage/domain/repositories/IconRepository';

@QueryHandler(GetIconUrlByFileNameQuery)
export class GetIconUrlByFileNameQueryHandler implements IQueryHandler<GetIconUrlByFileNameQuery> {
  constructor(@Inject(IconRepository) private repository: IconRepository) {}

  async execute(query: GetIconUrlByFileNameQuery) {
    const { fileName } = query;

    if (!(await this.repository.existsByFileName(fileName))) {
      throw new NotFoundException(`Icon: '${fileName}' not found.`);
    }

    return this.repository.getFilePath(fileName);
  }
}