'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { vulnerableSystems, VulnerableSystem } from '@/lib/data';

interface PendingSubmission extends VulnerableSystem {
  submittedBy: string;
  submittedDate: string;
}

export default function AdminPage() {
  const [pendingSubmissions] = useState<PendingSubmission[]>([
    {
      id: '101',
      name: 'SHA-1 Hash Function',
      description: 'Completely broken by quantum collision attacks using Grover\'s algorithm variants. No longer secure for any cryptographic use.',
      vulnerabilityLevel: 'critical',
      score: 9.8,
      affectedProtocols: ['Legacy SSL', 'Git (older versions)', 'Digital Certificates'],
      discoveredDate: '2024-05-01',
      organization: 'Cambridge Quantum Computing',
      status: 'pending',
      mitigation: 'Immediate migration to SHA-256 or SHA-3',
      submittedBy: 'john.doe@example.com',
      submittedDate: '2024-05-01',
    },
    {
      id: '102',
      name: 'SIKE (Supersingular Isogeny Key Encapsulation)',
      description: 'Recently broken using classical attacks. Previously considered quantum-resistant but found to have fundamental weaknesses.',
      vulnerabilityLevel: 'high',
      score: 8.5,
      affectedProtocols: ['Experimental PQC Implementations'],
      discoveredDate: '2024-04-28',
      organization: 'ETH Zurich',
      status: 'pending',
      mitigation: 'Remove from production systems and switch to NIST-approved PQC algorithms',
      submittedBy: 'researcher@ethz.ch',
      submittedDate: '2024-04-28',
    },
  ]);

  const [actionedIds, setActionedIds] = useState<Set<string>>(new Set());

  const handleApprove = (id: string) => {
    setActionedIds(prev => new Set(prev).add(id));
    // Simulate API call
    setTimeout(() => {
      alert('Submission approved and published!');
    }, 500);
  };

  const handleReject = (id: string) => {
    setActionedIds(prev => new Set(prev).add(id));
    // Simulate API call
    setTimeout(() => {
      alert('Submission rejected.');
    }, 500);
  };

  const verifiedCount = vulnerableSystems.filter(s => s.status === 'verified').length;
  const underReviewCount = vulnerableSystems.filter(s => s.status === 'under-review').length;
  const pendingCount = pendingSubmissions.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-purple-100 text-lg">
            Review and manage vulnerability submissions from the community.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl font-bold text-green-600">{verifiedCount}</div>
            <div className="text-sm text-gray-600 mt-1">Verified & Published</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl font-bold text-blue-600">{underReviewCount}</div>
            <div className="text-sm text-gray-600 mt-1">Under Review</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl font-bold text-yellow-600">{pendingCount}</div>
            <div className="text-sm text-gray-600 mt-1">Pending Review</div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Pending Submissions</h2>

        {pendingSubmissions.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Pending Submissions</h3>
            <p className="text-gray-600">All submissions have been reviewed.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pendingSubmissions.map((submission) => {
              const isActioned = actionedIds.has(submission.id);
              return (
                <div
                  key={submission.id}
                  className={`bg-white rounded-xl p-6 shadow-md border border-gray-200 transition-opacity ${
                    isActioned ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{submission.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Submitted by: {submission.submittedBy}</span>
                        <span>•</span>
                        <span>Date: {new Date(submission.submittedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                        submission.vulnerabilityLevel === 'critical'
                          ? 'text-red-700 bg-red-50 border-red-200'
                          : submission.vulnerabilityLevel === 'high'
                          ? 'text-orange-700 bg-orange-50 border-orange-200'
                          : submission.vulnerabilityLevel === 'medium'
                          ? 'text-yellow-700 bg-yellow-50 border-yellow-200'
                          : 'text-green-700 bg-green-50 border-green-200'
                      }`}
                    >
                      {submission.vulnerabilityLevel.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-1">Description</h4>
                      <p className="text-gray-700">{submission.description}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Affected Protocols</h4>
                        <div className="flex flex-wrap gap-2">
                          {submission.affectedProtocols.map((protocol) => (
                            <span
                              key={protocol}
                              className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm"
                            >
                              {protocol}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Organization</h4>
                        <p className="text-gray-700">{submission.organization}</p>
                      </div>
                    </div>

                    {submission.mitigation && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-blue-900 mb-1">Mitigation Strategy</h4>
                        <p className="text-blue-800 text-sm">{submission.mitigation}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <Button
                      variant="outline"
                      onClick={() => handleReject(submission.id)}
                      disabled={isActioned}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleApprove(submission.id)}
                      disabled={isActioned}
                    >
                      Approve & Publish
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
