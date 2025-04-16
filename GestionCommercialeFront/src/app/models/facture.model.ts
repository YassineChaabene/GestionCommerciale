// facture.model.ts
export interface Facture {
  id?: number;
  uuid?: string;
  reference: string;
  dateEmission: Date;
  dateEcheance: Date;
  montant: number;
  status: string;
  conventionUuid: string;
  conventionCode?: string; // <-- we enrich this in frontend
}
