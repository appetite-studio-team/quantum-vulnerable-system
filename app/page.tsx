import Link from 'next/link';
import Logo from '@/components/Logo';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <Logo className="w-8 h-8 text-slate-700" />
            <span className="text-lg font-semibold text-slate-900">Quantum Vulnerability Database</span>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 pb-12">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full border border-blue-200">
              Open Source Research Project
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Tracking Cryptographic Systems<br />
            Vulnerable to Quantum Attacks
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mb-8 leading-relaxed">
            A community-maintained database documenting cryptographic protocols and implementations at risk from quantum computing advances. 
            Shor's algorithm threatens public-key cryptography. Grover's algorithm weakens symmetric systems. 
            The transition to post-quantum cryptography is critical.
          </p>
          <div className="flex flex-wrap gap-4 mb-16">
            <Link href="/dashboard">
              <Button variant="primary" size="lg">
                Browse Database
              </Button>
            </Link>
            <Link href="/submit">
              <Button variant="outline" size="lg">
                Submit Vulnerability
              </Button>
            </Link>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-8 mb-20 pb-16 border-b border-slate-200">
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">24+</div>
              <div className="text-sm text-slate-600">Documented Vulnerabilities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">RSA, ECC, DH</div>
              <div className="text-sm text-slate-600">Critical Algorithms at Risk</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">~10 Years</div>
              <div className="text-sm text-slate-600">Estimated Timeline for Q-Day</div>
            </div>
          </div>
        </div>

        {/* Technical Overview */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">The Quantum Threat</h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong className="text-slate-900">Shor's Algorithm</strong> can factor large integers and compute discrete logarithms 
                in polynomial time on a quantum computer, effectively breaking RSA, ECC, and Diffie-Hellman—the foundation 
                of modern public-key cryptography.
              </p>
              <p>
                <strong className="text-slate-900">Grover's Algorithm</strong> provides quadratic speedup for unstructured search, 
                reducing the effective security of symmetric algorithms like AES-128 to 64-bit strength.
              </p>
              <p>
                Current estimates suggest a cryptographically-relevant quantum computer (CRQC) capable of breaking 2048-bit RSA 
                could emerge within 10-15 years. Organizations must begin migration to post-quantum cryptography now.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How It Works</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-700">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Community Research</h3>
                  <p className="text-sm text-slate-600">
                    Security researchers document cryptographic systems vulnerable to quantum attacks with detailed technical analysis.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-700">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Expert Verification</h3>
                  <p className="text-sm text-slate-600">
                    Submissions undergo peer review to verify technical accuracy before publication to the public database.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-700">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Public Access</h3>
                  <p className="text-sm text-slate-600">
                    Verified vulnerabilities are published with risk scores, affected protocols, and migration recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-slate-900 rounded-lg p-12 text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Contribute to Quantum Security Research</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Help document the scope of quantum vulnerabilities. Submit your findings to build a comprehensive resource 
            for the cryptographic community.
          </p>
          <Link href="/submit">
            <Button variant="secondary" size="lg">
              Submit a Vulnerability
            </Button>
          </Link>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3">
              <Logo className="w-6 h-6 text-slate-600" />
              <span className="text-sm text-slate-600">Quantum Vulnerability Database</span>
            </div>
            <div className="text-sm text-slate-500">
              Open source research project • Community maintained
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
