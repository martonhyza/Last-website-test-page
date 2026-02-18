
export interface LeadFormData {
  fullName: string;
  email: string;
  phone: string;
  budget: string;
  bottlenecks: string;
}

export interface AnalysisResponse {
  strategicInsights: string[];
  recommendedFocus: string;
}
