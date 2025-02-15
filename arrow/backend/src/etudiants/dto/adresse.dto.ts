import { IsString } from 'class-validator';

export class AdresseDto {
  @IsString()
  rue: string;

  @IsString()
  codePostal: string;

  @IsString()
  ville: string;

  @IsString()
  pays: string;
}
