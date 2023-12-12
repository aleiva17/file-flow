import { IconQueryService } from '@app/storage/domain/services/IconQueryService';
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetIconsFileNamesQuery } from '@app/storage/domain/model/queries/GetIconsFileNamesQuery';
import { GetIconUrlByFileNameQuery } from '@app/storage/domain/model/queries/GetIconUrlByFileNameQuery';

@Injectable()
export class IconQueryServiceImpl implements IconQueryService {
  constructor(private readonly queryBus: QueryBus) {}

  getIconsFileNames(): Promise<Array<string>> {
    return this.queryBus.execute(
      new GetIconsFileNamesQuery()
    );
  }

  getIconUrlByFileName(fileName: string): Promise<string> {
    return this.queryBus.execute(
      new GetIconUrlByFileNameQuery(fileName)
    );
  }
}
