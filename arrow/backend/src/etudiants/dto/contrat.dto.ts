import { IsString, IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum TypeContrat {
  ALTERNANCE = 'alternance',
  APPRENTISSAGE = 'apprentissage',
  PROFESSIONNALISATION = 'professionnalisation',
  STAGE = 'stage'
}

export class ContratDto {
  @IsEnum(TypeContrat)
  type: TypeContrat;

  @IsDate()
  @Type(() => Date)
  dateDebut: Date;

  @IsDate()
  @Type(() => Date)
  dateFin: Date;

  @IsString()
  entreprise: string;

  @IsString()
  numeroContrat: string;
}
