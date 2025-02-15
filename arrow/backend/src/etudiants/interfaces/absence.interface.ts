export interface Absence {
  date: Date;
  duree: number; // en heures
  justifie: boolean;
  type?: string;
  motif?: string;
  document?: string;
  dateJustification?: Date;
}