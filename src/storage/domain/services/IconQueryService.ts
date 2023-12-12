
export interface IconQueryService {
  getIconsFileNames(): Promise<Array<string>>;
  getIconUrlByFileName(fileName: string): Promise<string>;
}

export const IconQueryService = 'IconQueryService';