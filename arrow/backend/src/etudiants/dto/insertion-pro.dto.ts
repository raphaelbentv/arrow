import { IsString, IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum SituationPro {
  EMPLOI = 'emploi',
  RECHERCHE = 'recherche',
  FORMATION = 'formation',
  AUTRE = 'autre'
}

export class InsertionProDto {
  @IsEnum(SituationPro)
  situation: SituationPro;

  @IsString()
  entreprise: string;

  @IsString()
  poste: string;

  @IsDate()
  @Type(() => Date)
  dateEmbauche: Date;

  @IsString()
  secteur: string;
}
