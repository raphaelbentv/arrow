import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Evaluation extends Document {
  @Prop({ required: true })
  note: number;

  @Prop({ required: true })
  commentaire: string;

  @Prop({ required: true })
  module: string;

  @Prop({ type: Date, default: Date.now })
  date: Date;

  @Prop({ required: true })
  evaluateur: string;
}

export const EvaluationSchema = SchemaFactory.createForClass(Evaluation);