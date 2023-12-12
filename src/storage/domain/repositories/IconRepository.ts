
export interface IconRepository {
  save(icon: Express.Multer.File): Promise<boolean>;
  getAll(): Promise<Array<string>>;
  getFilePath(fileName: string): string;
  existsByFileName(fileName: string): Promise<boolean>;
  deleteByFileName(fileName: string): Promise<boolean>;
}

export const IconRepository = 'IconRepository';