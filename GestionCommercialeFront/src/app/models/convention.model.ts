import { Client } from './client.model';
import { Application } from './application.model';

export interface Convention {
  id?: number;
  code: string;
  status: 'ACTIVE' | 'ARCHIVED';
  startDate: string;
  endDate: string;
  archived?: boolean;
  client: Client | { id: number };  // Allow client to be just an ID
  application: Application | { id: number };  // Allow application to be just an ID
}
