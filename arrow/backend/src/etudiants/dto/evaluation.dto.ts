import { IsNumber, IsDate, IsString, IsOptional, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

export class EvaluationDto {
  @IsMongoId()
  module: string;

  @IsNumber()
  note: number;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsOptional()
  @IsString()
  commentaire?: string;
}
