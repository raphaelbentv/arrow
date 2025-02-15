import { IsString, IsEmail, IsDate, IsOptional, IsEnum, IsBoolean, ValidateNested, IsArray, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { AdresseDto } from './adresse.dto';
import { FormationDto } from './formation.dto';
import { EvaluationDto } from './evaluation.dto';
import { AbsenceDto } from './absence.dto';
import { ContratDto } from './contrat.dto';
import { DocumentsAdministratifsDto } from './documents-administratifs.dto';
import { StageDto } from './stage.dto';
import { InsertionProDto } from './insertion-pro.dto';
import { EvaluationSatisfactionDto } from './evaluation-satisfaction.dto';
import { ReclamationDto } from './reclamation.dto';
import { EtablissementOrigineDto } from './etablissement-origine.dto';
import { HandicapDto } from './handicap.dto';
import { RgpdDto } from '../dto/rgpd.dto';

export class CreateEtudiantDto {
  // 1. Informations Administratives et d'Identification
  @IsString()
  nom: string;

  @IsString()
  prenom: string;

  @IsDate()
  @Type(() => Date)
  dateNaissance: Date;

  @IsOptional()
  @IsString()
  lieuNaissance: string;

  @IsOptional()
  @IsString()
  nationalite: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  telephone: string;

  @IsOptional()
  @IsString()
  numeroSecuriteSociale: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AdresseDto)
  adresse: AdresseDto;

  @IsOptional()
  @IsString()
  photo: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  modules: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EvaluationDto)
  evaluations: EvaluationDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AbsenceDto)
  absences: AbsenceDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ContratDto)
  contrat: ContratDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DocumentsAdministratifsDto)
  documentsAdministratifs: DocumentsAdministratifsDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StageDto)
  stages: StageDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => InsertionProDto)
  insertionPro: InsertionProDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EvaluationSatisfactionDto)
  evaluationsSatisfaction: EvaluationSatisfactionDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReclamationDto)
  reclamations: ReclamationDto[];

  // 2. Informations Académiques et Pédagogiques
  @IsOptional()
  @IsString()
  niveauEntree: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  diplomesAnterieurs: string[];

  @ValidateNested()
  @Type(() => FormationDto)
  formation: FormationDto;

  @IsOptional()
  @IsEnum(['presentiel', 'distanciel', 'hybride'])
  modaliteFormation: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => EtablissementOrigineDto)
  etablissementOrigine: EtablissementOrigineDto;

  // 3. Informations Financières et Contractuelles
  @IsOptional()
  @IsEnum(['CPF', 'OPCO', 'entreprise', 'autofinancement', 'poleEmploi'])
  typeFinancement: string;

  // 4. Informations liées au Handicap
  @IsOptional()
  @ValidateNested()
  @Type(() => HandicapDto)
  handicap: HandicapDto;

  // 5. Informations sur l'Insertion Professionnelle
  @IsOptional()
  @IsString()
  projetProfessionnel: string;

  // 6. RGPD
  @IsBoolean()
  @ValidateNested()
  @Type(() => RgpdDto)
  rgpd: RgpdDto;

  // Métadonnées
  @IsString()
  promotion: string;

  @IsString()
  groupe: string;

  @IsOptional()
  @IsBoolean()
  actif: boolean;

  @IsDate()
  @Type(() => Date)
  dateInscription: Date;
}