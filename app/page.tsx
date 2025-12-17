import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Hero */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-slate-200 text-xs text-slate-600">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              Research database • Verified-only publishing
            </div>

            <h1 className="mt-6 text-5xl md:text-6xl font-semibold tracking-tight text-slate-900 text-balance">
              Quantum vulnerability tracking for real-world cryptographic systems.
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl">
              A curated index of systems exposed to quantum attacks, with concise weakness snapshots, protocol impact, and migration recommendations.
              Submissions are reviewed in Directus and published when verified.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard">
                <Button size="lg">Browse database</Button>
              </Link>
              <Link href="/submit">
                <Button variant="secondary" size="lg">Submit a finding</Button>
              </Link>
            </div>

            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              <div className="surface rounded-2xl p-5 shadow-sm">
                <div className="text-xs text-slate-500">Primary break</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">RSA / ECC / DH</div>
                <div className="mt-2 text-xs text-slate-600">Shor-affected public-key primitives</div>
              </div>
              <div className="surface rounded-2xl p-5 shadow-sm">
                <div className="text-xs text-slate-500">Degradation</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">AES-128 → ~64-bit</div>
                <div className="mt-2 text-xs text-slate-600">Grover search advantage</div>
              </div>
              <div className="surface rounded-2xl p-5 shadow-sm">
                <div className="text-xs text-slate-500">Migration</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">PQC + Hybrid</div>
                <div className="mt-2 text-xs text-slate-600">Kyber / Dilithium / AES-256</div>
              </div>
            </div>
          </div>

          {/* Right rail */}
          <div className="lg:col-span-5">
            <div className="surface rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">Research notes</h2>
                <span className="text-xs text-slate-500 font-mono">v0</span>
              </div>

              <div className="mt-4 space-y-4">
                <div className="surface-2 rounded-xl p-4">
                  <div className="text-xs text-slate-500">Threat model</div>
                  <div className="mt-1 text-sm text-slate-800">
                    <span className="font-mono">Harvest now, decrypt later</span> applies to long-retention data.
                  </div>
                </div>

                <div className="surface-2 rounded-xl p-4">
                  <div className="text-xs text-slate-500">Classification</div>
                  <div className="mt-2 flex flex-wrap gap-2">
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

                <div className="surface-2 rounded-xl p-4">
                  <div className="text-xs text-slate-500">PQC baseline</div>
                  <div className="mt-1 text-sm text-slate-800">
                    Prefer <span className="font-mono">CRYSTALS-Kyber</span> for KEM and <span className="font-mono">CRYSTALS-Dilithium</span> for signatures, with hybrid modes where applicable.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 surface rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Start here</h2>
              <p className="mt-2 text-sm text-slate-600">
                Browse verified entries, then submit systems you’ve evaluated. Include the current cryptography and a one-sentence weakness snapshot.
              </p>
              <div className="mt-4 flex gap-3">
                <Link href="/dashboard">
                  <Button variant="outline">View database</Button>
                </Link>
                <Link href="/submit">
                  <Button variant="ghost">Submission form</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 border-t border-slate-200 pt-8 text-sm text-slate-500">
          Built for research workflows. Public submissions are reviewed and published via Directus.
        </div>
      </main>
    </div>
  );
}
