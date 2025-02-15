import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const documentsMulterConfig: MulterOptions = {
  storage: diskStorage({
    destination: './uploads/documents',
    filename: (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
    }
  }),
  fileFilter: (req: Request, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|pdf|doc|docx)$/)) {
      return callback(new Error('Only images, PDF and DOC files are allowed!'), false);
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 10 // 10MB max
  }
};