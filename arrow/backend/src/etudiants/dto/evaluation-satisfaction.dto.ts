import { IsString, IsDate, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum TypeEvaluation {
  MODULE = 'module',
  FORMATION = 'formation',
  STAGE = 'stage'
}

export class EvaluationSatisfactionDto {
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsEnum(TypeEvaluation)
  type: TypeEvaluation;

  @IsNumber()
  satisfaction: number;

  @IsString()
  commentaires: string;
}
