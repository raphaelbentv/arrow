import { IsString, IsArray } from 'class-validator';

export class DocumentsAdministratifsDto {
  @IsString()
  pieceIdentite: string;

  @IsArray()
  @IsString({ each: true })
  conventions: string[];

  @IsString()
  reglementInterieur: string;

  @IsArray()
  @IsString({ each: true })
  contrats: string[];

  @IsArray()
  @IsString({ each: true })
  factures: string[];
}
