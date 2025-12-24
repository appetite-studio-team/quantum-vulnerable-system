// Shared types for VulnerableSystem
export interface VulnerableSystem {
  id: string;
  name: string;
  description: string;
  
  // Categorization
  system_category?: string;
  use_case?: string;
  
  // Risk Assessment
  quantum_risk_level: 'quantum-safe' | 'at-risk' | 'quantum-broken';
  vulnerability_level: 'critical' | 'high' | 'medium' | 'low';
  score: number;
  weakness_reason: string;
  
  // Cryptography Details
  current_cryptography: string[];
  affected_protocols: string[];
  
  // Recommendations
  quantumx_recommendation?: string;
  mitigation?: string;
  
  // Metadata
  discovered_date: string;
  organization: string;
  status: 'verified' | 'pending' | 'under-review';
}


