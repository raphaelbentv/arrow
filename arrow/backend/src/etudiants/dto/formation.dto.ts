import { IsString, IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class FormationDto {
  @IsString()
  intitule: string;

  @IsString()
  niveau: string;

  @IsNumber()
  duree: number;

  @IsDate()
  @Type(() => Date)
  dateDebut: Date;

  @IsDate()
  @Type(() => Date)
  dateFin: Date;
}
