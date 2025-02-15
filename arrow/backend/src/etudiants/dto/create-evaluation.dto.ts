import { IsString, IsNumber, IsDate, IsEnum, IsOptional, IsArray, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEvaluationDto {
  @IsString()
  module: string;

  @IsNumber()
  note: number;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsEnum(['controle', 'examen', 'projet', 'tp'])
  type: 'controle' | 'examen' | 'projet' | 'tp';

  @IsOptional()
  @IsString()
  commentaire?: string;

  @IsString()
  professeur: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  competences?: string[];

  @IsOptional()
  @IsNumber()
  coefficent?: number;

  @IsOptional()
  @IsBoolean()
  rattrapage?: boolean;
}