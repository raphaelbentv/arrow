import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Cours extends Document {
  @Prop({ required: true })
  titre: string;

  @Prop({ type: Types.ObjectId, ref: 'Intervenant', required: true })
  intervenant: Types.ObjectId;

  @Prop({ required: true })
  groupe: string;

  @Prop({ required: true })
  dateDebut: Date;

  @Prop({ required: true })
  dateFin: Date;

  @Prop({ enum: ['CM', 'TD', 'TP'], required: true })
  type: string;
}

export const CoursSchema = SchemaFactory.createForClass(Cours);