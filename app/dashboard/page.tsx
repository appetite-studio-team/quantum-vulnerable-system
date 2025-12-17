'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { VulnerableSystem } from '@/lib/data';
import { fetchVulnerabilities } from '@/lib/directus';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSystem, setSelectedSystem] = useState<VulnerableSystem | null>(null);
  const [systems, setSystems] = useState<VulnerableSystem[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page header */}
        <header className="surface rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Database</div>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Verified vulnerabilities</h1>
              <p className="mt-2 text-sm text-slate-600 max-w-2xl">
                Systems/assets exposed to Shor and Grover-class attacks—summarized for research, risk communication, and migration planning.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-600">
                <span className="w-2 h-2 rounded-full bg-slate-900" />
                Verified only
              </span>
              {!loading && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-medium text-indigo-700">
                  {systems.length} entries
                </span>
              )}
            </div>
          </div>
        </header>

        <div className="mt-6 grid lg:grid-cols-12 gap-6 items-start">
          {/* Main table */}
          <section className="lg:col-span-8">
            <div className="surface rounded-2xl shadow-sm overflow-hidden">
              {/* Search + legend */}
              <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center gap-3 justify-between">
                <div className="relative w-full md:max-w-md">
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search systems, categories, orgs…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-2.5 border border-slate-300 rounded-xl bg-white/80 shadow-sm placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-300 outline-none transition-[box-shadow,border-color,background-color]"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-xs font-medium text-green-800">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Quantum-safe
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-medium text-amber-800">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    At-risk
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-medium text-red-800">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    Quantum-broken
                  </span>
                </div>
              </div>

              {/* Column header */}
              <div className="px-4 py-3 bg-slate-50/70 border-b border-slate-200">
                <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  <div className="col-span-3">System / Asset</div>
                  <div className="col-span-2">Risk level</div>
                  <div className="col-span-4">Weakness</div>
                  <div className="col-span-3">Reason</div>
                </div>
              </div>

              {/* Rows */}
              {loading ? (
                <div className="p-8 text-sm text-slate-600">Loading verified vulnerabilities…</div>
              ) : filteredSystems.length === 0 ? (
                <div className="p-8 text-sm text-slate-600">No entries match your search.</div>
              ) : (
                <div className="divide-y divide-slate-200">
                  {filteredSystems.map((system) => {
                    const riskLabel =
                      system.quantum_risk_level === 'quantum-safe'
                        ? 'Quantum-safe'
                        : system.quantum_risk_level === 'at-risk'
                          ? 'At-risk (HNDL)'
                          : 'Quantum-broken';

                    const riskPill =
                      system.quantum_risk_level === 'quantum-safe'
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : system.quantum_risk_level === 'at-risk'
                          ? 'bg-amber-50 border-amber-200 text-amber-800'
                          : 'bg-red-50 border-red-200 text-red-800';

                    const riskDot =
                      system.quantum_risk_level === 'quantum-safe'
                        ? 'bg-green-500'
                        : system.quantum_risk_level === 'at-risk'
                          ? 'bg-amber-500'
                          : 'bg-red-500';

                    const riskStripe =
                      system.quantum_risk_level === 'quantum-safe'
                        ? 'border-l-green-500'
                        : system.quantum_risk_level === 'at-risk'
                          ? 'border-l-amber-500'
                          : 'border-l-red-500';

                    return (
                      <div
                        key={system.id}
                        onClick={() => setSelectedSystem(system)}
                        className={`grid grid-cols-12 gap-4 px-4 py-5 cursor-pointer transition-colors hover:bg-slate-50/70 border-l-4 ${riskStripe}`}
                      >
                        <div className="col-span-3 pr-2">
                          <div className="text-sm font-semibold text-slate-900 leading-tight">{system.name}</div>
                          {system.system_category && (
                            <div className="mt-1 text-xs text-slate-600">{system.system_category}</div>
                          )}
                          {system.use_case && (
                            <div className="mt-2 text-xs text-slate-500 line-clamp-2">{system.use_case}</div>
                          )}
                        </div>

                        <div className="col-span-2">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${riskPill}`}>
                            <span className={`w-2 h-2 rounded-full ${riskDot}`} />
                            {riskLabel}
                          </span>
                          <div className="mt-2 text-xs text-slate-600">
                            Score <span className="font-mono text-slate-900">{system.score}</span>
                          </div>
                        </div>

                        <div className="col-span-4">
                          <div className="text-sm text-slate-800 leading-relaxed">{system.weakness_reason}</div>
                          {system.current_cryptography?.length ? (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {system.current_cryptography.slice(0, 3).map((crypto) => (
                                <span
                                  key={crypto}
                                  className="px-2 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700"
                                >
                                  {crypto}
                                </span>
                              ))}
                              {system.current_cryptography.length > 3 && (
                                <span className="px-2 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs text-slate-600">
                                  +{system.current_cryptography.length - 3}
                                </span>
                              )}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-3">
                          <div className="text-sm text-slate-700 leading-relaxed line-clamp-3">{system.description}</div>
                          <div className="mt-2 text-xs font-medium text-indigo-700">Open detail →</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* Side notes */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="surface rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">How to read this table</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>
                  <span className="font-medium text-slate-900">Quantum-broken</span> indicates Shor-affected public-key cryptography (RSA/ECC/DH).
                </li>
                <li>
                  <span className="font-medium text-slate-900">At-risk</span> highlights long-retention systems vulnerable to “harvest now, decrypt later”.
                </li>
                <li>
                  <span className="font-medium text-slate-900">Weakness snapshot</span> should be a single, falsifiable statement you can validate.
                </li>
              </ul>
            </div>

            <div className="surface rounded-2xl p-6 shadow-sm bg-gradient-to-br from-indigo-50/70 to-sky-50/70">
              <h2 className="text-sm font-semibold text-slate-900">Submit a finding</h2>
              <p className="mt-2 text-sm text-slate-600">
                Add a new system with the current cryptography, a one-sentence weakness reason, and a migration recommendation.
              </p>
              <div className="mt-4">
                <Link href="/submit">
                  <Button>Open submission form</Button>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Modal */}
      {selectedSystem && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedSystem(null)}
        >
          <div
            className="surface rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur border-b border-slate-200 px-6 py-5">
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <h2 className="text-2xl font-semibold text-slate-900">{selectedSystem.name}</h2>
                  <p className="mt-1 text-sm text-slate-600">{selectedSystem.organization}</p>
                </div>
                <button
                  onClick={() => setSelectedSystem(null)}
                  className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-medium">
                  <span className="font-mono">{selectedSystem.score}</span>
                  Score
                </span>

                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${
                    selectedSystem.quantum_risk_level === 'quantum-safe'
                      ? 'bg-green-50 border-green-200 text-green-800'
                      : selectedSystem.quantum_risk_level === 'at-risk'
                        ? 'bg-amber-50 border-amber-200 text-amber-800'
                        : 'bg-red-50 border-red-200 text-red-800'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      selectedSystem.quantum_risk_level === 'quantum-safe'
                        ? 'bg-green-500'
                        : selectedSystem.quantum_risk_level === 'at-risk'
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                    }`}
                  />
                  {selectedSystem.quantum_risk_level === 'quantum-safe'
                    ? 'Quantum-safe'
                    : selectedSystem.quantum_risk_level === 'at-risk'
                      ? 'At-risk (HNDL)'
                      : 'Quantum-broken'}
                </span>

                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium ${
                    selectedSystem.vulnerability_level === 'critical'
                      ? 'bg-red-50 border-red-200 text-red-800'
                      : selectedSystem.vulnerability_level === 'high'
                        ? 'bg-orange-50 border-orange-200 text-orange-800'
                        : selectedSystem.vulnerability_level === 'medium'
                          ? 'bg-amber-50 border-amber-200 text-amber-800'
                          : 'bg-green-50 border-green-200 text-green-800'
                  }`}
                >
                  {selectedSystem.vulnerability_level.toUpperCase()}
                </span>

                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-slate-200 text-xs text-slate-600">
                  Status: {selectedSystem.status === 'under-review' ? 'Under Review' : selectedSystem.status}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-6 space-y-6">
              {(selectedSystem.system_category || selectedSystem.use_case) && (
                <div className="surface-2 rounded-xl p-4 grid sm:grid-cols-2 gap-4">
                  {selectedSystem.system_category && (
                    <div>
                      <div className="text-xs text-slate-500">System category</div>
                      <div className="mt-1 text-sm font-medium text-slate-900">{selectedSystem.system_category}</div>
                    </div>
                  )}
                  {selectedSystem.use_case && (
                    <div>
                      <div className="text-xs text-slate-500">Use case</div>
                      <div className="mt-1 text-sm font-medium text-slate-900">{selectedSystem.use_case}</div>
                    </div>
                  )}
                </div>
              )}

              <div className="surface-2 rounded-xl p-4 border-l-4 border-red-400">
                <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Weakness snapshot</div>
                <p className="mt-2 text-sm text-slate-800 leading-relaxed">{selectedSystem.weakness_reason}</p>
              </div>

              <div className="surface-2 rounded-xl p-4">
                <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Technical overview</div>
                <p className="mt-2 text-sm text-slate-800 leading-relaxed">{selectedSystem.description}</p>
              </div>

              {selectedSystem.current_cryptography?.length ? (
                <div className="surface-2 rounded-xl p-4">
                  <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Current cryptography</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedSystem.current_cryptography.map((crypto) => (
                      <span
                        key={crypto}
                        className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-800"
                      >
                        {crypto}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="surface-2 rounded-xl p-4">
                <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Affected protocols</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedSystem.affected_protocols.map((protocol) => (
                    <span
                      key={protocol}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800"
                    >
                      {protocol}
                    </span>
                  ))}
                </div>
              </div>

              {selectedSystem.quantumx_recommendation ? (
                <div className="surface-2 rounded-xl p-4 border-l-4 border-indigo-400">
                  <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">QuantumX recommendation</div>
                  <p className="mt-2 text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                    {selectedSystem.quantumx_recommendation}
                  </p>
                </div>
              ) : null}

              {selectedSystem.mitigation ? (
                <div className="surface-2 rounded-xl p-4 border-l-4 border-green-400">
                  <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Mitigation</div>
                  <p className="mt-2 text-sm text-slate-800 leading-relaxed">{selectedSystem.mitigation}</p>
                </div>
              ) : null}

              <div className="border-t border-slate-200 pt-4 text-xs text-slate-500 flex items-center justify-between">
                <span>
                  Discovered{' '}
                  {new Date(selectedSystem.discovered_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="font-mono">{selectedSystem.id}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
