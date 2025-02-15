import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Disponibilite extends Document {
  @Prop({ required: true })
  dateDebut: Date;

  @Prop({ required: true })
  dateFin: Date;

  @Prop({ required: true, enum: ['matin', 'apres-midi', 'journee'] })
  creneau: string;

  @Prop({ default: true })
  disponible: boolean;

  @Prop()
  commentaire?: string;
}

export const DisponibiliteSchema = SchemaFactory.createForClass(Disponibilite);