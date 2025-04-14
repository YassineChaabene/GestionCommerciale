export interface ConventionRequest {
  id?: number;
    uuid?: string;
    code: string;
    status: string;
    startDate: string;
    endDate: string | null;
    archived: boolean;
    clientId: number;
    applicationId: number;
  }
  