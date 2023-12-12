import { IconRepository } from '@app/storage/domain/repositories/IconRepository';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import * as fs from 'fs';
import { Subdirectory } from '@app/storage/domain/model/enumeration/subdirectory';

@Injectable()
export class IconRepositoryImpl implements IconRepository {
  private readonly path: string;

  constructor(private readonly configService: ConfigService) {
    this.path = join(
      this.configService.get<string>('STORAGE_DIRECTORY_PATH'),
      Subdirectory.Icons
    );
  }

  async save(icon: Express.Multer.File): Promise<boolean> {
    await fs.promises.writeFile(join(this.path, icon.originalname), icon.buffer);
    return true;
  }

  async getAll(): Promise<Array<string>> {
    return await this.listFilesInDirectory(this.path);
  }

  getFilePath(fileName: string): string {
    return join(this.path, fileName);
  }

  async existsByFileName(fileName: string): Promise<boolean> {
    const filePath = join(this.path, fileName);

    try {
      await fs.promises.access(filePath, fs.constants.F_OK);
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteByFileName(fileName:string): Promise<boolean> {
    const filePath = join(this.path, fileName);

    try {
      await this.removeFile(filePath);
      return true;
    } catch (error) {
      return false;
    }
  }

  private async listFilesInDirectory(directoryPath: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(directoryPath, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    });
  }

  private async removeFile(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}