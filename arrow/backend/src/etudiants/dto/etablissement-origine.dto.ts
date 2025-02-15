import { IsString } from 'class-validator';

export class EtablissementOrigineDto {
  @IsString()
  nom: string;

  @IsString()
  type: string;

  @IsString()
  ville: string;
}
