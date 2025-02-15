import { IsString, IsDate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TuteurDto {
  @IsString()
  nom: string;

  @IsString()
  email: string;

  @IsString()
  telephone: string;
}

export class StageDto {
  @IsString()
  entreprise: string;

  @IsString()
  poste: string;

  @IsDate()
  @Type(() => Date)
  dateDebut: Date;

  @IsDate()
  @Type(() => Date)
  dateFin: Date;

  @ValidateNested()
  @Type(() => TuteurDto)
  tuteur: TuteurDto;
}
