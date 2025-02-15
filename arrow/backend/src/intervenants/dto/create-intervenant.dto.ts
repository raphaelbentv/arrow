// src/intervenants/dto/create-intervenant.dto.ts

import { IsEmail, IsString, IsArray, IsOptional, IsNumber, IsBoolean, IsDate, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

// Sous-classes pour les objets imbriqués
class AdresseDto {
  @IsString()
  rue: string;

  @IsString()
  codePostal: string;

  @IsString()
  ville: string;

  @IsString()
  pays: string;
}

class ExperienceProDto {
  @IsString()
  entreprise: string;

  @IsString()
  poste: string;

  @IsDate()
  @Type(() => Date)
  debut: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  fin?: Date;

  @IsString()
  description: string;
}

class DiplomeCertificationDto {
  @IsString()
  titre: string;

  @IsString()
  etablissement: string;

  @IsNumber()
  annee: number;
}

class TarificationDto {
  @IsEnum(['horaire', 'forfaitaire'])
  type: string;

  @IsNumber()
  montant: number;
}

class ModuleDto {
  @IsString()
  nom: string;

  @IsString()
  niveau: string;

  @IsNumber()
  heuresAttribuees: number;

  @IsString()
  @IsOptional()
  modalitesEvaluation?: string;
}

export class CreateIntervenantDto {
  // Informations générales
  @IsString()
  nom: string;

  @IsString()
  prenom: string;

  @IsEmail()
  emailPro: string;

  @IsString()
  @IsOptional()
  telephone?: string;

  @ValidateNested()
  @Type(() => AdresseDto)
  @IsOptional()
  adresse?: AdresseDto;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dateNaissance?: Date;

  // Informations professionnelles
  @IsString()
  @IsOptional()
  posteActuel?: string;

  @IsString()
  statutProfessionnel: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceProDto)
  @IsOptional()
  experiencesPro?: ExperienceProDto[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  domainesExpertise?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DiplomeCertificationDto)
  @IsOptional()
  diplomesCertifications?: DiplomeCertificationDto[];

  // Données contractuelles
  @IsString()
  typeContrat: string;

  @IsDate()
  @Type(() => Date)
  dateDebutMission: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dateFinMission?: Date;

  @ValidateNested()
  @Type(() => TarificationDto)
  tarification: TarificationDto;

  @IsNumber()
  @IsOptional()
  heuresPrevisionnelles?: number;

  // Informations pédagogiques
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ModuleDto)
  modules: ModuleDto[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  methodesPedagogiques?: string[];

  // Données administratives
  @IsString()
  @IsOptional()
  siret?: string;

  @IsBoolean()
  @IsOptional()
  actif?: boolean = true;

  @IsString()
  @IsOptional()
  specialite?: string;
}