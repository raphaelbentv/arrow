import { IsString, IsEnum } from 'class-validator';

export enum DocumentType {
  PIECE_IDENTITE = 'pieceIdentite',
  CONVENTION = 'convention',
  REGLEMENT_INTERIEUR = 'reglementInterieur',
  CONTRAT = 'contrat',
  FACTURE = 'facture',
  JUSTIFICATIF_ABSENCE = 'justificatifAbsence',
  AUTRE = 'autre'
}

export class CreateDocumentDto {
  @IsEnum(DocumentType)
  type: DocumentType;

  @IsString()
  description?: string;
}
