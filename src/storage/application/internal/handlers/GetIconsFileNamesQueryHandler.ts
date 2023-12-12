import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetIconsFileNamesQuery } from '@app/storage/domain/model/queries/GetIconsFileNamesQuery';
import { IconRepository } from '@app/storage/domain/repositories/IconRepository';
import { Inject } from '@nestjs/common';

@QueryHandler(GetIconsFileNamesQuery)
export class GetIconsFileNamesQueryHandler implements IQueryHandler<GetIconsFileNamesQuery> {
  constructor(@Inject(IconRepository) private repository: IconRepository) {}

  async execute(query: GetIconsFileNamesQuery) {
    return await this.repository.getAll();
  }
}