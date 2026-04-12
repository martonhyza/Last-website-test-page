
export interface LeadFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  businessInfo: string;
  bottlenecks: string;
  smsConsent: boolean;
}

export interface AnalysisResponse {
  strategicInsights: string[];
  recommendedFocus: string;
}
