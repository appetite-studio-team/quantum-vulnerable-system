'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import { isAuthenticated, logout, getSession } from '@/lib/appwrite-client';
import type { VulnerableSystem } from '@/lib/types';

interface VulnerabilityFormData {
  name: string;
  description: string;
  system_category: string;
  use_case: string;
  quantum_risk_level: 'quantum-safe' | 'at-risk' | 'quantum-broken';
  vulnerability_level: 'critical' | 'high' | 'medium' | 'low';
  score: number;
  weakness_reason: string;
  current_cryptography: string;
  affected_protocols: string;
  quantumx_recommendation: string;
  mitigation: string;
  organization: string;
  status: 'verified' | 'pending' | 'under-review';
}

export default function AdminPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [vulnerabilities, setVulnerabilities] = useState<VulnerableSystem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<VulnerabilityFormData>({
    name: '',
    description: '',
    system_category: '',
    use_case: '',
    quantum_risk_level: 'at-risk',
    vulnerability_level: 'medium',
    score: 0,
    weakness_reason: '',
    current_cryptography: '',
    affected_protocols: '',
    quantumx_recommendation: '',
    mitigation: '',
    organization: '',
    status: 'pending',
  });
  const [formError, setFormError] = useState('');

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Load vulnerabilities when authenticated
  useEffect(() => {
    if (authenticated) {
      loadVulnerabilities();
    }
  }, [authenticated]);

  const checkAuth = async () => {
    const auth = await isAuthenticated();
    if (!auth) {
      router.push('/admin-login');
    } else {
      setAuthenticated(true);
    }
  };

  const loadVulnerabilities = async () => {
    try {
      const response = await fetch('/api/admin/vulnerabilities');
      const result = await response.json();
      if (result.success) {
        setVulnerabilities(result.data);
      }
    } catch (error) {
      console.error('Error loading vulnerabilities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/admin-login');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    try {
      const response = await fetch(`/api/admin/vulnerabilities/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        loadVulnerabilities();
      } else {
        alert(result.error || 'Failed to delete entry');
      }
    } catch (error) {
      alert('Error deleting entry');
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'verified' | 'pending' | 'under-review') => {
    try {
      const response = await fetch(`/api/admin/vulnerabilities/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const result = await response.json();
      if (result.success) {
        loadVulnerabilities();
      } else {
        alert(result.error || 'Failed to update status');
      }
    } catch (error) {
      alert('Error updating status');
    }
  };

  const handleEdit = (vuln: VulnerableSystem) => {
    setEditingId(vuln.id);
    setFormData({
      name: vuln.name,
      description: vuln.description,
      system_category: vuln.system_category || '',
      use_case: vuln.use_case || '',
      quantum_risk_level: vuln.quantum_risk_level,
      vulnerability_level: vuln.vulnerability_level,
      score: vuln.score,
      weakness_reason: vuln.weakness_reason,
      current_cryptography: vuln.current_cryptography.join(', '),
      affected_protocols: vuln.affected_protocols.join(', '),
      quantumx_recommendation: vuln.quantumx_recommendation || '',
      mitigation: vuln.mitigation || '',
      organization: vuln.organization,
      status: vuln.status,
    });
    setShowAddForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    try {
      const data = {
        ...formData,
        current_cryptography: formData.current_cryptography.split(',').map(s => s.trim()).filter(Boolean),
        affected_protocols: formData.affected_protocols.split(',').map(s => s.trim()).filter(Boolean),
      };

      let response;
      if (editingId) {
        // Update existing
        response = await fetch(`/api/admin/vulnerabilities/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } else {
        // Create new
        response = await fetch('/api/admin/vulnerabilities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      }

      const result = await response.json();
      if (result.success) {
        setShowAddForm(false);
        setEditingId(null);
        setFormData({
          name: '',
          description: '',
          system_category: '',
          use_case: '',
          quantum_risk_level: 'at-risk',
          vulnerability_level: 'medium',
          score: 0,
          weakness_reason: '',
          current_cryptography: '',
          affected_protocols: '',
          quantumx_recommendation: '',
          mitigation: '',
          organization: '',
          status: 'pending',
        });
        loadVulnerabilities();
      } else {
        setFormError(result.error || 'Failed to save entry');
      }
    } catch (error) {
      setFormError('Error saving entry');
    }
  };

  const filteredVulnerabilities = vulnerabilities.filter(vuln => {
    const matchesStatus = statusFilter === 'all' || vuln.status === statusFilter;
    const matchesSearch = 
      vuln.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vuln.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vuln.organization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'under-review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (authenticated === null || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-slate-300 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Logo className="w-8 h-8 text-slate-700" />
              <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">
                View Site
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout} className="rounded-none">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Entries */}
            <div className="bg-white border border-slate-200 rounded-none p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Total Entries</p>
                  <p className="text-3xl font-bold text-slate-900">{vulnerabilities.length}</p>
                </div>
                <div className="w-12 h-12 bg-slate-100 rounded-none flex items-center justify-center">
                  <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Pending Entries */}
            <div className="bg-white border border-slate-200 rounded-none p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Pending</p>
                  <p className="text-3xl font-bold text-yellow-700">
                    {vulnerabilities.filter(v => v.status === 'pending').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-none flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Under Review Entries */}
            <div className="bg-white border border-slate-200 rounded-none p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Under Review</p>
                  <p className="text-3xl font-bold text-blue-700">
                    {vulnerabilities.filter(v => v.status === 'under-review').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-none flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Verified Entries */}
            <div className="bg-white border border-slate-200 rounded-none p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Verified</p>
                  <p className="text-3xl font-bold text-green-700">
                    {vulnerabilities.filter(v => v.status === 'verified').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-none flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full sm:w-auto items-stretch">
              <div className="flex-1 sm:flex-initial">
                <Input
                  type="text"
                  placeholder="Search entries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64"
                />
              </div>
              <div className="flex-1 sm:flex-initial">
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  options={[
                    { value: 'all', label: 'All Status' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'under-review', label: 'Under Review' },
                    { value: 'verified', label: 'Verified' },
                  ]}
                  className="w-full sm:w-48"
                />
              </div>
            </div>
            <Button
              variant="primary"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  name: '',
                  description: '',
                  system_category: '',
                  use_case: '',
                  quantum_risk_level: 'at-risk',
                  vulnerability_level: 'medium',
                  score: 0,
                  weakness_reason: '',
                  current_cryptography: '',
                  affected_protocols: '',
                  quantumx_recommendation: '',
                  mitigation: '',
                  organization: '',
                  status: 'pending',
                });
                setShowAddForm(true);
              }}
              className="rounded-none w-full sm:w-auto"
            >
              Add New Entry
            </Button>
          </div>
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900">
                  {editingId ? 'Edit Entry' : 'Add New Entry'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingId(null);
                  }}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {formError}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Asset Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., RSA-2048 Public Key Infrastructure"
                  required
                />
                <Input
                  label="Organization *"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="e.g., NIST Post-Quantum Cryptography Project"
                  required
                />
                <Input
                  label="System Category"
                  value={formData.system_category}
                  onChange={(e) => setFormData({ ...formData, system_category: e.target.value })}
                  placeholder="e.g., Digital Identity, Banking, Healthcare"
                />
                <Input
                  label="Use Case"
                  value={formData.use_case}
                  onChange={(e) => setFormData({ ...formData, use_case: e.target.value })}
                  placeholder="e.g., Authentication, Digital Signatures, Secure Communications"
                />
                <Select
                  label="Quantum Risk Level *"
                  value={formData.quantum_risk_level}
                  onChange={(e) => setFormData({ ...formData, quantum_risk_level: e.target.value as any })}
                  options={[
                    { value: 'quantum-safe', label: 'Quantum Safe' },
                    { value: 'at-risk', label: 'At Risk' },
                    { value: 'quantum-broken', label: 'Quantum Broken' },
                  ]}
                  required
                />
                <Select
                  label="Vulnerability Level *"
                  value={formData.vulnerability_level}
                  onChange={(e) => setFormData({ ...formData, vulnerability_level: e.target.value as any })}
                  options={[
                    { value: 'critical', label: 'Critical' },
                    { value: 'high', label: 'High' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'low', label: 'Low' },
                  ]}
                  required
                />
                <Input
                  label="Risk Score *"
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={formData.score}
                  onChange={(e) => setFormData({ ...formData, score: parseFloat(e.target.value) || 0 })}
                  placeholder="0.0 - 10.0"
                  required
                />
                <Select
                  label="Status *"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  options={[
                    { value: 'pending', label: 'Pending' },
                    { value: 'under-review', label: 'Under Review' },
                    { value: 'verified', label: 'Verified' },
                  ]}
                  required
                />
              </div>
              <Textarea
                label="Detailed Technical Description *"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide a comprehensive technical overview of the vulnerability, including how quantum computers can exploit it..."
                rows={4}
                required
              />
              <Textarea
                label="Weakness Reason *"
                value={formData.weakness_reason}
                onChange={(e) => setFormData({ ...formData, weakness_reason: e.target.value })}
                placeholder="Explain why this system is vulnerable to quantum attacks (e.g., uses Shor's algorithm vulnerable cryptography)..."
                rows={3}
                required
              />
              <Input
                label="Current Cryptography (comma-separated)"
                value={formData.current_cryptography}
                onChange={(e) => setFormData({ ...formData, current_cryptography: e.target.value })}
                placeholder="RSA-2048, ECC-256, AES-128"
              />
              <Input
                label="Affected Protocols (comma-separated)"
                value={formData.affected_protocols}
                onChange={(e) => setFormData({ ...formData, affected_protocols: e.target.value })}
                placeholder="TLS 1.2, SSH, HTTPS"
              />
              <Textarea
                label="QuantumX Recommendation"
                value={formData.quantumx_recommendation}
                onChange={(e) => setFormData({ ...formData, quantumx_recommendation: e.target.value })}
                placeholder="Provide specific migration recommendations (e.g., migrate to CRYSTALS-Kyber, implement hybrid schemes)..."
                rows={4}
              />
              <Textarea
                label="Recommended Mitigation"
                value={formData.mitigation}
                onChange={(e) => setFormData({ ...formData, mitigation: e.target.value })}
                placeholder="Describe recommended mitigation strategies and implementation steps..."
                rows={3}
              />
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingId(null);
                  }}
                  className="rounded-none"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="rounded-none">
                  {editingId ? 'Update Entry' : 'Create Entry'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Entries List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {filteredVulnerabilities.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
            <p className="text-slate-600">No entries found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredVulnerabilities.map((vuln) => (
              <div
                key={vuln.id}
                className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">{vuln.name}</h3>
                        <p className="text-sm text-slate-600">{vuln.organization}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(vuln.status)}`}>
                        {vuln.status === 'under-review' ? 'Under Review' : vuln.status.charAt(0).toUpperCase() + vuln.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mb-3 line-clamp-2">{vuln.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded">
                        Risk: {vuln.score}
                      </span>
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded">
                        {vuln.quantum_risk_level}
                      </span>
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded">
                        {vuln.vulnerability_level}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 lg:flex-col">
                    <Select
                      value={vuln.status}
                      onChange={(e) => handleStatusChange(vuln.id, e.target.value as any)}
                      options={[
                        { value: 'pending', label: 'Pending' },
                        { value: 'under-review', label: 'Under Review' },
                        { value: 'verified', label: 'Verified' },
                      ]}
                      className="w-full sm:w-40 lg:w-full"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(vuln)}
                      className="rounded-none"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(vuln.id)}
                      className="rounded-none text-red-600 hover:text-red-700 hover:border-red-300"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Logo className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
              <span className="text-xs sm:text-sm text-slate-600">Quantum Vulnerability Database - Admin</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm text-slate-500 text-center md:text-left">
                Admin Portal
              </span>
              <a
                href="https://github.com/appetite-studio-team/quantum-vulnerable-system"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors"
                aria-label="GitHub Repository"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

