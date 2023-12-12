
export class IconFileUploadCommand {
  constructor(
    public readonly file: Express.Multer.File
  ) {}
}