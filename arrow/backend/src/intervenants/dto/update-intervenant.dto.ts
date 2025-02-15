import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, IsNumber, IsArray, IsBoolean, ValidateNested, IsEnum, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateIntervenantDto } from './create-intervenant.dto';

// Déclarer d'abord les DTOs imbriqués
class TarificationDto {
  @IsEnum(['horaire', 'forfait', 'jour'])
  type: string;

  @IsNumber()
  montant: number;
}

class ExperienceDto {
  @IsString()
  entreprise: string;

  @IsString()
  poste: string;

  @IsDate()
  @Type(() => Date)
  debut: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fin?: Date;

  @IsString()
  description: string;
}

class ModuleDto {
  @IsString()
  nom: string;

  @IsString()
  niveau: string;

  @IsNumber()
  heuresAttribuees: number;
}

// Ensuite, déclarer le DTO principal
export class UpdateIntervenantDto extends PartialType(CreateIntervenantDto) {
  @IsOptional()
  @IsString()
  nom?: string;

  @IsOptional()
  @IsString()
  emailPro?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => TarificationDto)
  tarification?: TarificationDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  experiencesPro?: ExperienceDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ModuleDto)
  modules?: ModuleDto[];
}