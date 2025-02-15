import { IsDate, IsString, IsBoolean, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDisponibiliteDto {
  @IsDate()
  @Type(() => Date)
  dateDebut: Date;

  @IsDate()
  @Type(() => Date)
  dateFin: Date;

  @IsEnum(['matin', 'apres-midi', 'journee'])
  creneau: string;

  @IsBoolean()
  @IsOptional()
  disponible?: boolean;

  @IsString()
  @IsOptional()
  commentaire?: string;
}