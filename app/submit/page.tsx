'use client';

import { useState, FormEvent } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import { submitVulnerability } from '@/lib/directus';

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

    // Convert comma-separated strings to arrays
    const protocols = formData.affected_protocols
      .split(',')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const cryptography = formData.current_cryptography
      .split(',')
      .map(c => c.trim())
      .filter(c => c.length > 0);

    const result = await submitVulnerability({
      name: formData.name,
      description: formData.description,
      system_category: formData.system_category || undefined,
      use_case: formData.use_case || undefined,
      quantum_risk_level: formData.quantum_risk_level,
      vulnerability_level: formData.vulnerability_level,
      weakness_reason: formData.weakness_reason,
      current_cryptography: cryptography,
      affected_protocols: protocols,
      organization: formData.organization,
      quantumx_recommendation: formData.quantumx_recommendation || undefined,
      mitigation: formData.mitigation || undefined,
      score: formData.score,
    });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
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
      }, 3000);
    } else {
      setError(result.error || 'Failed to submit vulnerability');
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="surface rounded-2xl shadow-sm p-8 text-center max-w-md w-full">
          <div className="w-14 h-14 bg-green-50 border border-green-200 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Submission received</h2>
          <p className="mt-2 text-sm text-slate-600">
            Your report has been saved as <span className="font-medium text-slate-900">pending</span> in Directus.
            It will appear on the public database once verified.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="surface rounded-2xl p-6 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Submit</div>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Submit a vulnerability finding</h1>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            Reports are saved as pending in Directus and published to the public database after verification.
            Keep the weakness snapshot concise and the technical description reproducible.
          </p>
        </header>

        <div className="mt-6 grid lg:grid-cols-12 gap-6 items-start">
          <aside className="lg:col-span-4 space-y-6">
            <div className="surface rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Workflow</h2>
              <div className="mt-4 space-y-4 text-sm text-slate-600">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-semibold text-slate-700">1</div>
                  <div>
                    <div className="font-medium text-slate-900">Submit</div>
                    <div className="mt-1">Provide system context, current cryptography, and a weakness snapshot.</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-semibold text-slate-700">2</div>
                  <div>
                    <div className="font-medium text-slate-900">Verify</div>
                    <div className="mt-1">Editors review accuracy and request clarification if needed.</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-semibold text-slate-700">3</div>
                  <div>
                    <div className="font-medium text-slate-900">Publish</div>
                    <div className="mt-1">Verified entries appear under the Database route.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="surface rounded-2xl p-6 shadow-sm bg-gradient-to-br from-indigo-50/70 to-sky-50/70">
              <h2 className="text-sm font-semibold text-slate-900">Submission guidelines</h2>
              <ul className="mt-3 text-sm text-slate-700 space-y-2">
                <li>• Use a single-sentence weakness snapshot (testable claim).</li>
                <li>• List concrete crypto primitives and key sizes.</li>
                <li>• Avoid marketing language; focus on reproducible details.</li>
                <li>• Provide a migration recommendation when possible.</li>
              </ul>
            </div>
          </aside>

          <section className="lg:col-span-8">
            <div className="surface rounded-2xl p-6 shadow-sm">
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm font-semibold text-slate-900">System</h3>
                    <span className="text-xs text-slate-500">Required fields marked *</span>
                  </div>

                  <div className="mt-4 grid md:grid-cols-2 gap-4">
                    <Input
                      label="System/Asset Name *"
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

                  <div className="mt-4 grid md:grid-cols-2 gap-4">
                    <Input
                      label="Use Case"
                      type="text"
                      placeholder="e.g., Authentication, Secure transactions, Data protection"
                      value={formData.use_case}
                      onChange={(e) => handleChange('use_case', e.target.value)}
                    />

                    <Input
                      label="Organization *"
                      type="text"
                      placeholder="e.g., MIT Quantum Lab"
                      value={formData.organization}
                      onChange={(e) => handleChange('organization', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="surface-2 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-slate-900">Risk assessment</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Use Quantum Risk for Shor/Grover classification; use Severity for prioritization.
                  </p>

                  <div className="mt-4 grid md:grid-cols-3 gap-4">
                    <Select
                      label="Quantum Risk Level *"
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
                      label="Vulnerability Severity *"
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
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Risk Score (0–10) *
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={formData.score}
                        onChange={(e) => handleChange('score', parseFloat(e.target.value))}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-white/80 shadow-sm placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-300 outline-none transition-[box-shadow,border-color,background-color]"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Technical details</h3>

                  <div className="mt-4 space-y-4">
                    <Textarea
                      label="Weakness Reason *"
                      placeholder="One sentence (e.g., 'Public-key factorization vulnerable to Shor\'s algorithm')"
                      value={formData.weakness_reason}
                      onChange={(e) => handleChange('weakness_reason', e.target.value)}
                      rows={2}
                      required
                    />

                    <Textarea
                      label="Detailed Technical Description *"
                      placeholder="Provide reproducible technical context: threat model, where the crypto is used, and what breaks under quantum attack…"
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      rows={6}
                      required
                    />

                    <Input
                      label="Current Cryptography *"
                      type="text"
                      placeholder="e.g., RSA-2048, ECC (P-256), AES-128 (comma-separated)"
                      value={formData.current_cryptography}
                      onChange={(e) => handleChange('current_cryptography', e.target.value)}
                      required
                    />

                    <Input
                      label="Affected Protocols *"
                      type="text"
                      placeholder="e.g., TLS 1.2, SSH, PGP (comma-separated)"
                      value={formData.affected_protocols}
                      onChange={(e) => handleChange('affected_protocols', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="surface-2 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-slate-900">Recommendations (optional)</h3>
                  <div className="mt-4 space-y-4">
                    <Textarea
                      label="QuantumX Recommendation"
                      placeholder="e.g., Hybrid ECDHE + Kyber; Dilithium signatures; AES-256 for long-term storage…"
                      value={formData.quantumx_recommendation}
                      onChange={(e) => handleChange('quantumx_recommendation', e.target.value)}
                      rows={3}
                    />

                    <Textarea
                      label="Mitigation"
                      placeholder="Operational mitigations or migration steps…"
                      value={formData.mitigation}
                      onChange={(e) => handleChange('mitigation', e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
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
                      })
                    }
                  >
                    Clear
                  </Button>
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting…' : 'Submit for review'}
                  </Button>
                </div>
              </form>
            </div>
          </section>
        </div>

        <div className="mt-10 text-xs text-slate-500">
          Submissions are saved as <span className="font-medium text-slate-700">pending</span> and become public when verified.
        </div>
      </div>
    </div>
  );
}
