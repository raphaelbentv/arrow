import { IsString, IsNumber, IsOptional, IsDate, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateModuleDto {
  @IsString()
  nom: string;

  @IsString()
  niveau: string;

  @IsNumber()
  heuresAttribuees: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateDebut?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateFin?: Date;

  @IsOptional()
  @IsBoolean()
  termine?: boolean;
}