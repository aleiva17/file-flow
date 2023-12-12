import { BaseResponse } from '@app/shared/domain/service/communication/BaseResponse';

export interface IconCommandService {
  uploadIcon(icon: Express.Multer.File): Promise<BaseResponse<string>>;
  deleteIconByFileName(fileName: string): Promise<BaseResponse<string>>;
  updateIconWithFileName(fileName: string, newIcon: Express.Multer.File): Promise<BaseResponse<string>>;
}

export const IconCommandService = 'IconCommandService';