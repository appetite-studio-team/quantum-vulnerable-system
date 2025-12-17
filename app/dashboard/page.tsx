'use client';

import { useState } from 'react';
import { vulnerableSystems, VulnerableSystem } from '@/lib/data';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSystem, setSelectedSystem] = useState<VulnerableSystem | null>(null);

  const filteredSystems = vulnerableSystems.filter(system => 
    system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    system.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    system.organization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight uppercase text-gray-900 drop-shadow-sm">
            THE QUANTUM VULNERABLE SYSTEMS
          </h1>
          <p className="text-gray-800 text-lg max-w-4xl leading-relaxed">
            The Quantum Vulnerability Tracker is an <span className="underline">open source</span> database of cryptographic systems vulnerable to quantum computing. Now tracking {vulnerableSystems.length} systems globally.
          </p>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search vulnerabilities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-black rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#a855f7]"
              />
            </div>
            <button className="px-6 py-3 bg-black text-white font-bold rounded-md hover:bg-gray-800 transition-colors border-2 border-black flex items-center gap-2">
              <span className="text-xl">+</span>
              LIST YOUR SYSTEM
            </button>
            <button className="px-6 py-3 bg-white text-black font-bold rounded-md hover:bg-gray-50 transition-colors border-2 border-black flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
              JOIN THE DISCORD
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        {/* Table Header */}
        <div className="border-2 border-black rounded-t-lg bg-white">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 font-bold text-sm uppercase text-gray-900 tracking-tight">
            <div className="col-span-2">Name</div>
            <div className="col-span-4">Description</div>
            <div className="col-span-2">Organization</div>
            <div className="col-span-2">Tags</div>
            <div className="col-span-2 text-center">Risk</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="space-y-0">
          {filteredSystems.map((system, index) => (
            <div
              key={system.id}
              onClick={() => setSelectedSystem(system)}
              className="border-2 border-t-0 border-black bg-white hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <div className="grid grid-cols-12 gap-4 px-6 py-6 items-center">
                {/* Name Column */}
                <div className="col-span-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#a855f7] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div className="font-bold text-base text-gray-900 leading-tight break-words">
                      {system.name}
                    </div>
                  </div>
                </div>

                {/* Description Column */}
                <div className="col-span-4">
                  <p className="text-base text-gray-900 leading-relaxed line-clamp-4 break-words">
                    {system.description}
                  </p>
                </div>

                {/* Organization Column */}
                <div className="col-span-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-yellow-300 text-gray-900 rounded-full text-sm font-bold border-2 border-black break-words">
                      {system.organization}
                    </span>
                  </div>
                </div>

                {/* Tags Column */}
                <div className="col-span-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-[#a855f7] text-white rounded-full text-sm font-bold border-2 border-black">
                      {system.vulnerabilityLevel}
                    </span>
                    {system.status === 'verified' && (
                      <span className="px-3 py-1.5 bg-blue-400 text-black rounded-full text-sm font-bold border-2 border-black">
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                {/* Risk Column */}
                <div className="col-span-2 flex items-center justify-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-2 border-black">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{system.score}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedSystem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          onClick={() => setSelectedSystem(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-3xl">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedSystem.name}</h2>
                  <p className="text-gray-600">{selectedSystem.organization}</p>
                </div>
                <button
                  onClick={() => setSelectedSystem(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="px-8 py-8 space-y-8">
              {/* Score and Level */}
              <div className="flex items-center gap-4">
                <div className="bg-[#a855f7] text-white px-8 py-4 rounded-2xl">
                  <div className="text-sm font-medium mb-1">Risk Score</div>
                  <div className="text-4xl font-bold">{selectedSystem.score}</div>
                </div>
                <div className={`px-6 py-4 rounded-2xl font-semibold border-2 ${
                  selectedSystem.vulnerabilityLevel === 'critical' ? 'text-red-700 bg-red-50 border-red-200' :
                  selectedSystem.vulnerabilityLevel === 'high' ? 'text-orange-700 bg-orange-50 border-orange-200' :
                  selectedSystem.vulnerabilityLevel === 'medium' ? 'text-yellow-700 bg-yellow-50 border-yellow-200' :
                  'text-green-700 bg-green-50 border-green-200'
                }`}>
                  <div className="text-sm mb-1">Priority Level</div>
                  <div className="text-lg">{selectedSystem.vulnerabilityLevel.toUpperCase()}</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed text-base">{selectedSystem.description}</p>
              </div>

              {/* Affected Protocols */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Affected Protocols</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSystem.affectedProtocols.map((protocol) => (
                    <span key={protocol} className="px-4 py-2 bg-purple-50 text-[#a855f7] rounded-lg text-sm font-medium border border-purple-100">
                      {protocol}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mitigation */}
              {selectedSystem.mitigation && (
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Mitigation Strategy</h3>
                  <p className="text-green-800 leading-relaxed">{selectedSystem.mitigation}</p>
                </div>
              )}

              {/* Meta Information */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Status</div>
                  <div className={`inline-flex px-3 py-1.5 rounded-full text-sm font-medium ${
                    selectedSystem.status === 'verified' ? 'bg-green-100 text-green-800' :
                    selectedSystem.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedSystem.status === 'under-review' ? 'Under Review' : selectedSystem.status.charAt(0).toUpperCase() + selectedSystem.status.slice(1)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Discovery Date</div>
                  <div className="font-medium text-gray-900">
                    {new Date(selectedSystem.discoveredDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
