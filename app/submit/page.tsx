'use client';

import { useState, FormEvent } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
// import { submitVulnerability } from '@/lib/directus'; // Will connect API later

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    system_category: '',
    use_case: '',
    quantum_risk_level: 'at-risk' as 'quantum-safe' | 'at-risk' | 'quantum-broken',
    vulnerability_level: 'medium' as 'critical' | 'high' | 'medium' | 'low',
    weakness_reason: '',
    current_cryptography: '',
    affected_protocols: '',
    organization: '',
    quantumx_recommendation: '',
    mitigation: '',
    score: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Mock submission - will connect API later
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay

    setIsSubmitting(false);

    // Mock successful submission
    setSubmitted(true);
    // Reset form
    setFormData({
      name: '',
      description: '',
      system_category: '',
      use_case: '',
      quantum_risk_level: 'at-risk',
      vulnerability_level: 'medium',
      weakness_reason: '',
      current_cryptography: '',
      affected_protocols: '',
      organization: '',
      quantumx_recommendation: '',
      mitigation: '',
      score: 5,
    });
    // Hide snackbar after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Snackbar Notification */}
      {submitted && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out">
          <div className="bg-white border border-slate-200 rounded-lg shadow-lg px-6 py-4 flex items-center gap-4 min-w-[320px] max-w-md">
            <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">Thank you!</p>
              <p className="text-xs text-slate-600 mt-0.5">Your submission will be under review.</p>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-3 text-slate-900">Submit Vulnerability</h1>
          <p className="text-slate-600 text-lg">
            Contribute to the quantum security research community. All submissions undergo verification before publication.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-slate-200">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="System/Asset Name"
                type="text"
                placeholder="e.g., Digital Identity System, Banking Infrastructure"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />

              <Input
                label="System Category"
                type="text"
                placeholder="e.g., Banking, Healthcare, IoT, Cloud, Satellite"
                value={formData.system_category}
                onChange={(e) => handleChange('system_category', e.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Use Case"
                type="text"
                placeholder="e.g., Authentication, Secure transactions, Data protection"
                value={formData.use_case}
                onChange={(e) => handleChange('use_case', e.target.value)}
              />

              <Input
                label="Organization"
                type="text"
                placeholder="e.g., MIT Quantum Lab"
                value={formData.organization}
                onChange={(e) => handleChange('organization', e.target.value)}
                required
              />
            </div>

            <Textarea
              label="Weakness Reason"
              placeholder="Short snapshot of why the system is exposed (e.g., 'Public-key factorization vulnerable to quantum algorithms')"
              value={formData.weakness_reason}
              onChange={(e) => handleChange('weakness_reason', e.target.value)}
              rows={2}
              required
            />

            <Textarea
              label="Detailed Technical Description"
              placeholder="Provide comprehensive technical details about the vulnerability and how quantum computing poses a threat..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={5}
              required
            />

            <Input
              label="Current Cryptography"
              type="text"
              placeholder="e.g., RSA-2048, ECC (P-256), AES-128 (comma-separated)"
              value={formData.current_cryptography}
              onChange={(e) => handleChange('current_cryptography', e.target.value)}
              required
            />

            <Input
              label="Affected Protocols"
              type="text"
              placeholder="e.g., TLS 1.2, SSH, PGP (comma-separated)"
              value={formData.affected_protocols}
              onChange={(e) => handleChange('affected_protocols', e.target.value)}
              required
            />

            <div className="grid md:grid-cols-3 gap-6">
              <Select
                label="Quantum Risk Level"
                value={formData.quantum_risk_level}
                onChange={(e) => handleChange('quantum_risk_level', e.target.value)}
                options={[
                  { value: 'quantum-safe', label: 'Quantum-safe' },
                  { value: 'at-risk', label: 'At-risk (Harvest now, decrypt later)' },
                  { value: 'quantum-broken', label: 'Quantum-broken (Shor-affected)' },
                ]}
                required
              />

              <Select
                label="Vulnerability Severity"
                value={formData.vulnerability_level}
                onChange={(e) => handleChange('vulnerability_level', e.target.value)}
                options={[
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' },
                  { value: 'critical', label: 'Critical' },
                ]}
                required
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Risk Score (0-10)
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={formData.score}
                  onChange={(e) => handleChange('score', parseFloat(e.target.value))}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <Textarea
              label="QuantumX Recommendation"
              placeholder="Recommended post-quantum cryptography migration (e.g., 'Hybrid ECC + CRYSTALS-Kyber, CRYSTALS-Dilithium, AES-256 + PQC-ready key exchange')..."
              value={formData.quantumx_recommendation}
              onChange={(e) => handleChange('quantumx_recommendation', e.target.value)}
              rows={3}
            />

            <Textarea
              label="Recommended Mitigation (Optional)"
              placeholder="Suggest mitigation strategies or alternative solutions..."
              value={formData.mitigation}
              onChange={(e) => handleChange('mitigation', e.target.value)}
              rows={4}
            />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">Submission Guidelines</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Base your submission on verified research or credible sources</li>
                <li>• Provide comprehensive technical details about the vulnerability</li>
                <li>• Include risk assessment and affected protocols</li>
                <li>• All submissions undergo expert verification before publication</li>
              </ul>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormData({
                  name: '',
                  description: '',
                  system_category: '',
                  use_case: '',
                  quantum_risk_level: 'at-risk',
                  vulnerability_level: 'medium',
                  weakness_reason: '',
                  current_cryptography: '',
                  affected_protocols: '',
                  organization: '',
                  quantumx_recommendation: '',
                  mitigation: '',
                  score: 5,
                })}
              >
                Clear Form
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit for Review'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
