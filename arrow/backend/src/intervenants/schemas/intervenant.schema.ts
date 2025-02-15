// src/intervenants/schemas/intervenant.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Disponibilite, DisponibiliteSchema } from './disponibilite.schema';

// Définir les sous-schémas
class Adresse {
  @Prop({ type: String })
  rue: string;

  @Prop({ type: String })
  codePostal: string;

  @Prop({ type: String })
  ville: string;

  @Prop({ type: String })
  pays: string;
}

class ExperiencePro {
  @Prop({ type: String })
  entreprise: string;

  @Prop({ type: String })
  poste: string;

  @Prop({ type: Date })
  debut: Date;

  @Prop({ type: Date })
  fin: Date;

  @Prop({ type: String })
  description: string;
}

class DiplomeCertification {
  @Prop({ type: String })
  titre: string;

  @Prop({ type: String })
  etablissement: string;

  @Prop({ type: Number })
  annee: number;

  @Prop({ type: String })
  documentUrl: string;
}

class Tarification {
  @Prop({ type: String })
  type: string;

  @Prop({ type: Number })
  montant: number;
}

class Module {
  @Prop({ type: String })
  nom: string;

  @Prop({ type: String })
  niveau: string;

  @Prop({ type: Number })
  heuresAttribuees: number;

  @Prop({ type: String })
  modalitesEvaluation: string;

  @Prop({ type: [String] })
  supportsUrl: string[];
}

class Evaluation {
  @Prop({ type: Date })
  date: Date;

  @Prop({ type: String })
  source: string;

  @Prop({ type: Number })
  note: number;

  @Prop({ type: String })
  commentaire: string;
}

@Schema({ timestamps: true })
export class Intervenant extends Document {
  @Prop({ required: true, type: String })
  nom: string;

  @Prop({ required: true, type: String })
  prenom: string;

  @Prop({ required: true, unique: true, type: String })
  emailPro: string;

  @Prop({ type: String })
  telephone: string;

  @Prop({ type: Adresse })
  adresse: Adresse;

  @Prop({ type: Date })
  dateNaissance: Date;

  @Prop({ type: String })
  posteActuel: string;

  @Prop({ required: true, type: String })
  statutProfessionnel: string;

  @Prop({ type: [ExperiencePro] })
  experiencesPro: ExperiencePro[];

  @Prop({ type: [String] })
  domainesExpertise: string[];

  @Prop({ type: [DiplomeCertification] })
  diplomesCertifications: DiplomeCertification[];

  @Prop({ type: String })
  cvUrl: string;

  @Prop({ required: true, type: String })
  typeContrat: string;

  @Prop({ type: Date })
  dateDebutMission: Date;

  @Prop({ type: Date })
  dateFinMission: Date;

  @Prop({ type: Tarification })
  tarification: Tarification;

  @Prop({ type: Number, default: 0 })
  heuresPrevisionnelles: number;

  @Prop({ type: String })
  ribUrl: string;

  @Prop({ type: [Module] })
  modules: Module[];

  @Prop({ type: [String] })
  methodesPedagogiques: string[];

  @Prop({ type: String })
  pieceIdentiteUrl: string;

  @Prop({ type: String })
  siret: string;

  @Prop({ type: String })
  assuranceRCPUrl: string;

  @Prop({ type: String })
  kbisUrl: string;

  @Prop({ type: [Evaluation] })
  evaluations: Evaluation[];

  @Prop({ type: Boolean, default: true })
  actif: boolean;

  @Prop({ type: String })
  specialite: string;

  @Prop({ type: Date, default: Date.now })
  dateCreation: Date;

  @Prop({ type: [DisponibiliteSchema] })
  disponibilites: Disponibilite[];
}

export const IntervenantSchema = SchemaFactory.createForClass(Intervenant);