import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EtudiantDocument = Etudiant & Document;

@Schema()
export class Etudiant {
  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  prenom: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  motDePasse: string;

  @Prop()
  promotion: string;

  @Prop()
  specialite: string;

  @Prop({ default: Date.now })
  dateInscription: Date;
}

export const EtudiantSchema = SchemaFactory.createForClass(Etudiant);
