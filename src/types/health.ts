export interface HealthResults {
  hemoglobin: {
    value: number;
    status: string;
    recommendation: string;
  };
  glucose: {
    value: number;
    status: string;
    recommendation: string;
  };
  cholesterol: {
    value: number;
    status: string;
    recommendation: string;
  };
}