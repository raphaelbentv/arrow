import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { DocumentsEtudiant } from '../interfaces/documents.interface';

@Schema({ timestamps: true })
export class Etudiant extends Document {
  // 1. Informations Administratives et d'Identification
  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  prenom: string;

  @Prop({ required: true })
  dateNaissance: Date;

  @Prop()
  lieuNaissance: string;

  @Prop()
  nationalite: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  telephone: string;

  @Prop()
  numeroSecuriteSociale: string;

  @Prop({
    type: {
      rue: String,
      codePostal: String,
      ville: String,
      pays: String,
    },
  })
  adresse: {
    rue: string;
    codePostal: string;
    ville: string;
    pays: string;
  };

  @Prop()
  photo: string;

  // 2. Informations Académiques et Pédagogiques
  @Prop()
  niveauEntree: string;

  @Prop([String])
  diplomesAnterieurs: string[];

  @Prop({
    type: {
      intitule: String,
      niveau: String,
      duree: Number,
      dateDebut: Date,
      dateFin: Date,
    },
    required: true,
  })
  formation: {
    intitule: string;
    niveau: string;
    duree: number;
    dateDebut: Date;
    dateFin: Date;
  };

  @Prop({ enum: ['presentiel', 'distanciel', 'hybride'] })
  modaliteFormation: string;

  @Prop({
    type: {
      nom: String,
      type: String,
      ville: String,
    },
  })
  etablissementOrigine: {
    nom: string;
    type: string;
    ville: string;
  };

  @Prop([{ type: Types.ObjectId, ref: 'Module' }])
  modules: Types.ObjectId[];

  @Prop([{
    module: { type: Types.ObjectId, ref: 'Module' },
    note: Number,
    date: Date,
    commentaire: String
  }])
  evaluations: {
    module: Types.ObjectId;
    note: number;
    date: Date;
    commentaire?: string;
  }[];

  @Prop([{
    date: Date,
    duree: Number,
    justifie: Boolean,
    motif: String,
    document: String
  }])
  absences: {
    type: string | undefined;
    date: Date;
    duree: number;
    justifie: boolean;
    motif?: string;
    document?: string;
  }[];

  // 3. Informations Financières et Contractuelles
  @Prop({ enum: ['CPF', 'OPCO', 'entreprise', 'autofinancement', 'poleEmploi'] })
  typeFinancement: string;

  @Prop({
    type: {
      type: String,
      dateDebut: Date,
      dateFin: Date,
      entreprise: String,
      numeroContrat: String,
    },
  })
  contrat: {
    type: string;
    dateDebut: Date;
    dateFin: Date;
    entreprise: string;
    numeroContrat: string;
  };

  @Prop({
    type: {
      pieceIdentite: String,
      conventions: [String],
      reglementInterieur: String,
      contrats: [String],
      factures: [String],
    },
  })
  documentsAdministratifs: {
    pieceIdentite: string;
    conventions: string[];
    reglementInterieur: string;
    contrats: string[];
    factures: string[];
  };

  @Prop({
    type: {
      pieceIdentite: String,
      conventions: [String],
      reglementInterieur: String,
      contrats: [String],
      factures: [String],
    },
  })
  documents: DocumentsEtudiant;

  // 4. Informations liées au Handicap
  @Prop({
    type: {
      situation: Boolean,
      besoinsSpecifiques: String,
      amenagements: [String],
      referentHandicap: String,
    },
  })
  handicap: {
    situation: boolean;
    besoinsSpecifiques: string;
    amenagements: string[];
    referentHandicap: string;
  };

  // 5. Informations sur l'Insertion Professionnelle
  @Prop([{
    entreprise: String,
    poste: String,
    dateDebut: Date,
    dateFin: Date,
    tuteur: {
      nom: String,
      email: String,
      telephone: String,
    },
  }])
  stages: {
    entreprise: string;
    poste: string;
    dateDebut: Date;
    dateFin: Date;
    tuteur: {
      nom: string;
      email: string;
      telephone: string;
    };
  }[];

  @Prop()
  projetProfessionnel: string;

  @Prop({
    type: {
      situation: String,
      entreprise: String,
      poste: String,
      dateEmbauche: Date,
      secteur: String,
    },
  })
  insertionPro: {
    situation: string;
    entreprise: string;
    poste: string;
    dateEmbauche: Date;
    secteur: string;
  };

  // 6. Satisfaction et Qualité
  @Prop([{
    date: Date,
    type: String,
    satisfaction: Number,
    commentaires: String,
  }])
  evaluationsSatisfaction: {
    date: Date;
    type: string;
    satisfaction: number;
    commentaires: string;
  }[];

  @Prop([{
    date: Date,
    description: String,
    status: String,
    resolution: String,
  }])
  reclamations: {
    date: Date;
    description: string;
    status: string;
    resolution: string;
  }[];

  // 7. RGPD
  @Prop({
    type: {
      consentement: Boolean,
      dateConsentement: Date,
      droitsAcces: Boolean,
    },
  })
  rgpd: {
    consentement: boolean;
    dateConsentement: Date;
    droitsAcces: boolean;
  };

  // Métadonnées
  @Prop({ default: true })
  actif: boolean;

  @Prop({ default: 'etudiant' })
  role: string;

  @Prop({ required: true })
  promotion: string;

  @Prop({ required: true })
  groupe: string;
}

export const EtudiantSchema = SchemaFactory.createForClass(Etudiant);