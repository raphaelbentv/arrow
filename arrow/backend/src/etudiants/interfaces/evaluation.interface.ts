import { Types } from 'mongoose';

export interface Evaluation {
  module: Types.ObjectId;
  note: number;
  date: Date;
  commentaire?: string;
}