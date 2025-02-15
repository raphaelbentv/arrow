import { Expose } from 'class-transformer';
import { DocumentType } from './create-document.dto';

export class DocumentResponseDto {
  @Expose()
  id: string;

  @Expose()
  type: DocumentType;

  @Expose()
  filename: string;

  @Expose()
  path: string;

  @Expose()
  uploadDate: Date;

  @Expose()
  description?: string;
}
