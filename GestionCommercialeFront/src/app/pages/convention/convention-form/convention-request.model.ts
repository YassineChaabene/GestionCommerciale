export interface ConventionRequest {
    code: string;
    status: string;
    startDate: string;
    endDate: string | null;
    archived: boolean;
    clientId: number;
    applicationId: number;
  }
  