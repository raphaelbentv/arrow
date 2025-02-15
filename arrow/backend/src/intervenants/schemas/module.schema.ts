import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Module extends Document {
  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  niveau: string;

  @Prop({ required: true })
  heuresAttribuees: number;

  @Prop({ type: Date })
  dateDebut: Date;

  @Prop({ type: Date })
  dateFin: Date;

  @Prop({ default: false })
  termine: boolean;
}

export const ModuleSchema = SchemaFactory.createForClass(Module);