import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class FilterIntervenantDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  specialite?: string;

  @IsOptional()
  @IsBoolean()
  actif?: boolean;
}