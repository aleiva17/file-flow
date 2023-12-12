import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Subdirectory } from '@app/storage/domain/model/enumeration/subdirectory';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class LocalStorageConfigurationService implements OnModuleInit {
  private readonly logger = new Logger(LocalStorageConfigurationService.name);

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.verifyRootDirectory();
    this.verifySubdirectories();
  }

  private verifyRootDirectory() {
    this.createDirectoryOnRootPath();
  }

  private verifySubdirectories() {
    for (const directoryKey of Object.keys(Subdirectory)) {
      this.createDirectoryOnRootPath(Subdirectory[directoryKey]);
    }
  }

  private createDirectoryOnRootPath(folderName?: string | undefined) {
    const rootPath = this.configService.get<string>('STORAGE_DIRECTORY_PATH');
    const directoryPath = folderName ? join(rootPath, folderName) : rootPath;

    folderName = folderName ?? rootPath.split('/').at(-1);
    this.logger.log(`Checking if '${folderName}' directory exists.`);

    if (fs.existsSync(directoryPath)) {
      this.logger.log(`OK. Directory '${folderName}' already exists.`);
      return;
    }

    this.logger.log(`Directory '${folderName}' doesn't exists. Creating the directory.`);

    fs.mkdir(directoryPath, (error) => {
      if (error) {
        this.logger.error(`Error creating directory: ${error.message}`);
        return;
      }
      this.logger.log(`Directory '${folderName}' created successfully.`);
    });
  }
}
