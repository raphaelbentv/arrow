import { IsNumber, IsString, Min, Max } from 'class-validator';

export class CreateEvaluationDto {
  @IsNumber()
  @Min(0)
  @Max(5)
  note: number;

  @IsString()
  commentaire: string;

  @IsString()
  module: string;

  @IsString()
  evaluateur: string;
}