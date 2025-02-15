import { IsDate, IsNumber, IsBoolean, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class AbsenceDto {
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

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateJustification?: Date;

  @IsOptional()
  @IsString()
  document?: string;
}
