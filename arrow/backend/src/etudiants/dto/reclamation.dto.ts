import { IsString, IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum StatusReclamation {
  OUVERTE = 'ouverte',
  EN_COURS = 'en_cours',
  RESOLUE = 'resolue',
  FERMEE = 'fermee'
}

export class ReclamationDto {
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsString()
  description: string;

  @IsEnum(StatusReclamation)
  status: StatusReclamation;

  @IsString()
  resolution: string;
}
