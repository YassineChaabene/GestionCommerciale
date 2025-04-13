import { Convention } from "./convention.model";

export interface Facture {
    id?: number;
    uuid:String;
    Reference: string;
    dateEmission: Date;
    dateEcheance: Date;
    montantTotale:number
    statut: String;
    convention:Convention
  }
  