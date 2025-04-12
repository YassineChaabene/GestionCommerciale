  import { Application } from "./application.model";
  import { Client } from "./client.model";

  export interface Convention {
    id?: number;
    code: string;
    status: string;
    startDate: string;
    endDate?: string;
    archived: boolean;  // Add the archived field
    client: Client;   // Change client to clientId
    application: Application;  // Change application to applicationId
  }
