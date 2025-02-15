import { IsString, IsNumber, IsDate, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAbsenceDto {
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsNumber()
  duree: number;

  @IsBoolean()
  justifie: boolean;

  @IsOptional()
  @IsString()
  motif?: string;

  @IsString()
  module: string;

  @IsString()
  professeur: string;

  @IsEnum(['cours', 'tp', 'examen', 'projet'])
  type: 'cours' | 'tp' | 'examen' | 'projet';

  @IsOptional()
  @IsEnum(['avertissement', 'sanction', 'exclusion'])
  impact?: 'avertissement' | 'sanction' | 'exclusion';

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateJustification?: Date;

  @IsOptional()
  @IsString()
  validePar?: string;
}