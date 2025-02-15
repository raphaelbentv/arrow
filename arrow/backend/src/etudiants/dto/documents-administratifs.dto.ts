import { IsString, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DocumentResponseDto } from './document-response.dto';

export class DocumentsAdministratifsDto {
  @IsOptional()
  @IsString()
  pieceIdentite?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentResponseDto)
  conventions?: DocumentResponseDto[];

  @IsOptional()
  @IsString()
  reglementInterieur?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentResponseDto)
  contrats?: DocumentResponseDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentResponseDto)
  factures?: DocumentResponseDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentResponseDto)
  autres?: DocumentResponseDto[];
}
