// Re-export types from Directus integration
export type { VulnerableSystem } from './directus';

export function getVulnerabilityColor(level: 'critical' | 'high' | 'medium' | 'low') {
  const colors = {
    critical: 'text-red-700 bg-red-50 border-red-200',
    high: 'text-orange-700 bg-orange-50 border-orange-200',
    medium: 'text-yellow-700 bg-yellow-50 border-yellow-200',
    low: 'text-green-700 bg-green-50 border-green-200',
  };
  return colors[level];
}

export function getStatusColor(status: 'verified' | 'pending' | 'under-review') {
  const colors = {
    verified: 'text-green-700 bg-green-50',
    pending: 'text-yellow-700 bg-yellow-50',
    'under-review': 'text-blue-700 bg-blue-50',
  };
  return colors[status];
}
