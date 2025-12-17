'use client';

import { useState, FormEvent } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    vulnerabilityLevel: 'medium',
    affectedProtocols: '',
    organization: '',
    mitigation: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          description: '',
          vulnerabilityLevel: 'medium',
          affectedProtocols: '',
          organization: '',
          mitigation: '',
          email: '',
        });
      }, 3000);
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Submission Received!</h2>
          <p className="text-gray-600">
            Thank you for contributing to the Quantum Vulnerability Database. Our team will review your submission shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">Submit Vulnerability</h1>
          <p className="text-purple-100 text-lg">
            Help us build a comprehensive database of quantum-vulnerable systems. Your submission will be reviewed by our team before publication.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="System/Protocol Name"
                type="text"
                placeholder="e.g., RSA-2048 Encryption"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />

              <Select
                label="Vulnerability Level"
                value={formData.vulnerabilityLevel}
                onChange={(e) => handleChange('vulnerabilityLevel', e.target.value)}
                options={[
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' },
                  { value: 'critical', label: 'Critical' },
                ]}
                required
              />
            </div>

            <Textarea
              label="Detailed Description"
              placeholder="Provide a comprehensive description of the vulnerability, including how quantum computing poses a threat..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={5}
              required
            />

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Affected Protocols"
                type="text"
                placeholder="e.g., TLS 1.2, SSH, PGP (comma-separated)"
                value={formData.affectedProtocols}
                onChange={(e) => handleChange('affectedProtocols', e.target.value)}
                required
              />

              <Input
                label="Your Organization"
                type="text"
                placeholder="e.g., MIT Quantum Lab"
                value={formData.organization}
                onChange={(e) => handleChange('organization', e.target.value)}
                required
              />
            </div>

            <Textarea
              label="Recommended Mitigation (Optional)"
              placeholder="Suggest mitigation strategies or alternative solutions..."
              value={formData.mitigation}
              onChange={(e) => handleChange('mitigation', e.target.value)}
              rows={4}
            />

            <Input
              label="Contact Email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">Submission Guidelines</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Ensure your submission is based on verified research or credible sources</li>
                <li>• Provide as much technical detail as possible</li>
                <li>• All submissions undergo admin review before publication</li>
                <li>• You may be contacted for additional information</li>
              </ul>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormData({
                  name: '',
                  description: '',
                  vulnerabilityLevel: 'medium',
                  affectedProtocols: '',
                  organization: '',
                  mitigation: '',
                  email: '',
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
