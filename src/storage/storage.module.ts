import { Module } from '@nestjs/common';
import {
  LocalStorageConfigurationService
} from '@app/storage/infrastructure/persistence/local/configuration/LocalStorageConfiguration.service';
import { IconRepositoryImpl } from '@app/storage/infrastructure/persistence/local/repositories/IconRepositoryImpl';
import { CqrsModule } from '@nestjs/cqrs';
import { IconsController } from '@app/storage/interfaces/rest/icons.controller';
import { IconQueryServiceImpl } from '@app/storage/application/internal/services/IconQueryServiceImpl';
import { IconRepository } from '@app/storage/domain/repositories/IconRepository';
import { IconQueryService } from '@app/storage/domain/services/IconQueryService';
import { GetIconsFileNamesQueryHandler } from '@app/storage/application/internal/handlers/GetIconsFileNamesQueryHandler';
import {
  GetIconUrlByFileNameQueryHandler
} from '@app/storage/application/internal/handlers/GetIconUrlByFileNameQueryHandler';
import { MulterModule } from '@nestjs/platform-express';
import { IconFileUploadCommandHandler } from '@app/storage/application/internal/handlers/IconFileUploadCommandHandler';
import { IconCommandService } from '@app/storage/domain/services/IconCommandService';
import { IconCommandServiceImpl } from '@app/storage/application/internal/services/IconCommandServiceImpl';
import {
  DeleteIconByFileNameCommandHandler
} from '@app/storage/application/internal/handlers/DeleteIconByFileNameCommandHandler';

@Module({
  imports: [
    CqrsModule,
    MulterModule.register({
      fileFilter: (_, file, cb) => {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null, true);
      },
    })
  ],
  controllers: [IconsController],
  providers: [
    { provide: IconRepository, useClass: IconRepositoryImpl },
    { provide: IconQueryService, useClass: IconQueryServiceImpl },
    { provide: IconCommandService, useClass: IconCommandServiceImpl },
    LocalStorageConfigurationService,
    GetIconsFileNamesQueryHandler,
    GetIconUrlByFileNameQueryHandler,
    IconFileUploadCommandHandler,
    DeleteIconByFileNameCommandHandler
  ],
})
export class StorageModule {}
