'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { VulnerableSystem } from '@/lib/data';
import { fetchVulnerabilities } from '@/lib/directus';
import Logo from '@/components/Logo';
import Button from '@/components/ui/Button';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSystem, setSelectedSystem] = useState<VulnerableSystem | null>(null);
  const [systems, setSystems] = useState<VulnerableSystem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function loadData() {
      const data = await fetchVulnerabilities();
      setSystems(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredSystems = systems.filter(system => 
    system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    system.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    system.organization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCard = (systemId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(systemId)) {
        newSet.delete(systemId);
      } else {
        newSet.add(systemId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-slate-900">
            Vulnerability Database
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-4xl">
            Comprehensive documentation of cryptographic systems vulnerable to quantum computing. 
            {!loading && `Currently tracking ${systems.length} verified vulnerabilities.`}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="relative max-w-md">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, description, or organization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Vulnerabilities Table/Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-600">Loading vulnerabilities...</p>
          </div>
        ) : filteredSystems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
            <p className="text-slate-600">No vulnerabilities found matching your search.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-lg border border-slate-200 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200">
                <div className="col-span-3 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  System / Asset
                </div>
                <div className="col-span-2 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Risk Level
                </div>
                <div className="col-span-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Weakness
                </div>
                <div className="col-span-3 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Reason
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-slate-200">
                {filteredSystems.map((system) => {
                  const getRiskLevelColor = (level: string) => {
                    if (level === 'quantum-safe') return 'bg-green-100 text-green-800 border-green-200';
                    if (level === 'at-risk') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
                    return 'bg-red-100 text-red-800 border-red-200';
                  };

                  const getRiskLevelLabel = (level: string) => {
                    if (level === 'quantum-safe') return 'Quantum-safe';
                    if (level === 'at-risk') return 'At-risk (HNDL)';
                    return 'Quantum-broken';
                  };

                  return (
                    <div
                      key={system.id}
                      onClick={() => setSelectedSystem(system)}
                      className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      {/* System/Asset Column */}
                      <div className="col-span-3">
                        <h3 className="font-semibold text-slate-900 mb-1">{system.name}</h3>
                        {system.system_category && (
                          <span className="text-xs text-slate-600">{system.system_category}</span>
                        )}
                        {system.use_case && (
                          <p className="text-xs text-slate-500 mt-1">{system.use_case}</p>
                        )}
                      </div>

                      {/* Risk Level Column */}
                      <div className="col-span-2">
                        <span className={`inline-flex px-3 py-1 rounded-md text-xs font-semibold border ${
                          getRiskLevelColor(system.quantum_risk_level)
                        }`}>
                          {getRiskLevelLabel(system.quantum_risk_level)}
                        </span>
                        <div className="mt-2 flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                            system.score >= 9 ? 'bg-red-600' :
                            system.score >= 7 ? 'bg-orange-600' :
                            system.score >= 5 ? 'bg-yellow-600' :
                            'bg-green-600'
                          }`}>
                            {system.score}
                          </div>
                          <span className="text-xs text-slate-600">Risk Score</span>
                        </div>
                      </div>

                      {/* Weakness Column */}
                      <div className="col-span-4">
                        <p className="text-sm text-slate-800 leading-relaxed">
                          {system.weakness_reason}
                        </p>
                        {system.current_cryptography && system.current_cryptography.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {system.current_cryptography.slice(0, 3).map((crypto) => (
                              <span key={crypto} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-mono">
                                {crypto}
                              </span>
                            ))}
                            {system.current_cryptography.length > 3 && (
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                                +{system.current_cryptography.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Reason Column */}
                      <div className="col-span-3">
                        <p className="text-sm text-slate-700 line-clamp-3">
                          {system.description}
                        </p>
                        <button className="text-xs text-blue-600 hover:text-blue-700 mt-2 font-medium">
                          View details →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {filteredSystems.map((system) => {
                const getRiskLevelColor = (level: string) => {
                  if (level === 'quantum-safe') return 'bg-green-100 text-green-800 border-green-200';
                  if (level === 'at-risk') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
                  return 'bg-red-100 text-red-800 border-red-200';
                };

                const getRiskLevelLabel = (level: string) => {
                  if (level === 'quantum-safe') return 'Quantum-safe';
                  if (level === 'at-risk') return 'At-risk (HNDL)';
                  return 'Quantum-broken';
                };

                const isExpanded = expandedCards.has(system.id);

                return (
                  <div
                    key={system.id}
                    className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm"
                  >
                    {/* Card Header - Always Visible */}
                    <div
                      onClick={() => toggleCard(system.id)}
                      className="p-4 cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-900 mb-1 text-base">{system.name}</h3>
                          {system.system_category && (
                            <span className="text-xs text-slate-600">{system.system_category}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-semibold border ${
                            getRiskLevelColor(system.quantum_risk_level)
                          }`}>
                            {getRiskLevelLabel(system.quantum_risk_level)}
                          </span>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                            system.score >= 9 ? 'bg-red-600' :
                            system.score >= 7 ? 'bg-orange-600' :
                            system.score >= 5 ? 'bg-yellow-600' :
                            'bg-green-600'
                          }`}>
                            {system.score}
                          </div>
                          <svg
                            className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Collapsible Content */}
                    {isExpanded && (
                      <div className="border-t border-slate-200 p-4 space-y-4">
                        {system.use_case && (
                          <div>
                            <div className="text-xs text-slate-500 mb-1">Use Case</div>
                            <div className="text-sm text-slate-700">{system.use_case}</div>
                          </div>
                        )}

                        <div>
                          <div className="text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wide">Weakness</div>
                          <p className="text-sm text-slate-800 leading-relaxed">{system.weakness_reason}</p>
                        </div>

                        {system.current_cryptography && system.current_cryptography.length > 0 && (
                          <div>
                            <div className="text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">Cryptography</div>
                            <div className="flex flex-wrap gap-1.5">
                              {system.current_cryptography.map((crypto) => (
                                <span key={crypto} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-mono">
                                  {crypto}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <div className="text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wide">Description</div>
                          <p className="text-sm text-slate-700 leading-relaxed line-clamp-4">{system.description}</p>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSystem(system);
                          }}
                          className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-none text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          View Full Details
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Submit Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-slate-900 rounded-lg p-6 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Contribute to the Database</h2>
          <p className="text-sm sm:text-base text-slate-300 mb-4 sm:mb-6 max-w-2xl mx-auto">
            Found a vulnerability? Submit your findings to help build a comprehensive resource for the cryptographic community.
          </p>
          <Link href="/submit">
            <Button variant="secondary" size="lg" className="rounded-none">
              Submit a Vulnerability
            </Button>
          </Link>
        </div>
      </div>

      {/* Modal */}
      {selectedSystem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 sm:p-6 z-50"
          onClick={() => setSelectedSystem(null)}
        >
          <div
            className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-4 sm:px-6 py-4 sm:py-5">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4 sm:pr-8 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 break-words">{selectedSystem.name}</h2>
                  <p className="text-sm sm:text-base text-slate-600">{selectedSystem.organization}</p>
                </div>
                <button
                  onClick={() => setSelectedSystem(null)}
                  className="text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="px-4 sm:px-6 py-6 sm:py-8">
              {/* Risk Summary - Minimal Design */}
              <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-slate-200">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-1">{selectedSystem.score}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Risk Score</div>
                </div>
                <div className="text-center border-x border-slate-200">
                  <div className="text-sm sm:text-base font-semibold text-slate-900 mb-1">
                    {selectedSystem.quantum_risk_level === 'quantum-safe' ? 'Quantum-safe' :
                     selectedSystem.quantum_risk_level === 'at-risk' ? 'At-risk' :
                     'Quantum-broken'}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Quantum Risk</div>
                </div>
                <div className="text-center">
                  <div className="text-sm sm:text-base font-semibold text-slate-900 mb-1">{selectedSystem.vulnerability_level.toUpperCase()}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Severity</div>
                </div>
              </div>

              {/* System Info */}
              {(selectedSystem.system_category || selectedSystem.use_case) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 pb-8 border-b border-slate-200">
                  {selectedSystem.system_category && (
                    <div>
                      <div className="text-xs text-slate-500 mb-2 uppercase tracking-wide">System Category</div>
                      <div className="text-base font-medium text-slate-900">{selectedSystem.system_category}</div>
                    </div>
                  )}
                  {selectedSystem.use_case && (
                    <div>
                      <div className="text-xs text-slate-500 mb-2 uppercase tracking-wide">Use Case</div>
                      <div className="text-base font-medium text-slate-900">{selectedSystem.use_case}</div>
                    </div>
                  )}
                </div>
              )}

              {/* Weakness Reason */}
              <div className="mb-8 pb-8 border-b border-slate-200">
                <h3 className="text-xs text-slate-500 mb-3 uppercase tracking-wide font-medium">Weakness Snapshot</h3>
                <p className="text-base text-slate-900 leading-relaxed">{selectedSystem.weakness_reason}</p>
              </div>

              {/* Description */}
              <div className="mb-8 pb-8 border-b border-slate-200">
                <h3 className="text-xs text-slate-500 mb-3 uppercase tracking-wide font-medium">Technical Overview</h3>
                <p className="text-base text-slate-700 leading-relaxed">{selectedSystem.description}</p>
              </div>

              {/* Current Cryptography */}
              {selectedSystem.current_cryptography && selectedSystem.current_cryptography.length > 0 && (
                <div className="mb-8 pb-8 border-b border-slate-200">
                  <h3 className="text-xs text-slate-500 mb-3 uppercase tracking-wide font-medium">Current Cryptography</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSystem.current_cryptography.map((crypto) => (
                      <span key={crypto} className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded border border-slate-200 text-sm font-mono">
                        {crypto}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Affected Protocols */}
              <div className="mb-8 pb-8 border-b border-slate-200">
                <h3 className="text-xs text-slate-500 mb-3 uppercase tracking-wide font-medium">Affected Protocols</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSystem.affected_protocols.map((protocol) => (
                    <span key={protocol} className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded border border-slate-200 text-sm font-medium">
                      {protocol}
                    </span>
                  ))}
                </div>
              </div>

              {/* QuantumX Recommendation */}
              {selectedSystem.quantumx_recommendation && (
                <div className="mb-8 pb-8 border-b border-slate-200">
                  <h3 className="text-xs text-slate-500 mb-3 uppercase tracking-wide font-medium">QuantumX Recommendation</h3>
                  <p className="text-base text-slate-700 leading-relaxed whitespace-pre-line">{selectedSystem.quantumx_recommendation}</p>
                </div>
              )}

              {/* Mitigation */}
              {selectedSystem.mitigation && (
                <div className="mb-8 pb-8 border-b border-slate-200">
                  <h3 className="text-xs text-slate-500 mb-3 uppercase tracking-wide font-medium">Recommended Mitigation</h3>
                  <p className="text-base text-slate-700 leading-relaxed">{selectedSystem.mitigation}</p>
                </div>
              )}

              {/* Discovery Date */}
              <div className="pt-2">
                <div className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Discovered</div>
                <div className="text-sm font-medium text-slate-900">
                  {new Date(selectedSystem.discovered_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Logo className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
              <span className="text-xs sm:text-sm text-slate-600">Quantum Vulnerability Database</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <span className="inline-block px-2.5 sm:px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full border border-blue-200">
                Open Source Research Project
              </span>
              <span className="text-xs sm:text-sm text-slate-500 text-center md:text-left">
                Community maintained
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
