import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class FileService {
  private readonly uploadDir = 'uploads';
  private readonly documentsDir = join(this.uploadDir, 'documents');
  private readonly photosDir = join(this.uploadDir, 'photos');
  private readonly contractsDir = join(this.uploadDir, 'contracts');

  constructor() {
    this.ensureDirectoriesExist();
  }

  private ensureDirectoriesExist() {
    [this.uploadDir, this.documentsDir, this.photosDir, this.contractsDir].forEach(dir => {
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
    });
  }

  getFilePath(category: 'documents' | 'photos' | 'contracts', filename: string): string {
    const directories = {
      documents: this.documentsDir,
      photos: this.photosDir,
      contracts: this.contractsDir,
    };
    return join(directories[category], filename);
  }

  async saveFile(file: Express.Multer.File, destination: string): Promise<string> {
    const uploadPath = path.join(__dirname, '../../../uploads', destination);
    await fs.mkdir(uploadPath, { recursive: true });
    const filePath = path.join(uploadPath, file.originalname);
    await fs.writeFile(filePath, file.buffer);
    return filePath;
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }
}