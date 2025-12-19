import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/Logo';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Logo className="w-7 h-7 sm:w-8 sm:h-8 text-slate-700" />
              <span className="hidden md:block text-base sm:text-lg font-semibold text-slate-900">Quantum Vulnerability Database</span>
            </div>
            <a
              href="https://github.com/appetite-studio-team/quantum-vulnerable-system"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors rounded-none"
              aria-label="GitHub Repository"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Image - Mobile Only */}
        <div className="md:hidden -mx-4 sm:-mx-6 mb-3">
          <Image
            src="/header-image.png"
            alt="Quantum Vulnerability Database"
            width={800}
            height={400}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        <div className="pt-4 md:pt-12 lg:pt-16 pb-8 sm:pb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
            Tracking Cryptographic Systems<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>Vulnerable to Quantum Attacks
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mb-6 sm:mb-8 leading-relaxed">
            A community-maintained database tracking cryptographic systems vulnerable to quantum computing. 
            The transition to post-quantum cryptography is critical.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-12 sm:mb-16">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto rounded-none">
                Browse Database
              </Button>
            </Link>
            <Link href="/submit" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-none">
                Submit Vulnerability
              </Button>
            </Link>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20 pb-8 sm:pb-12 md:pb-16 border-b border-slate-200">
            <div className="text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-1 sm:mb-2">24+</div>
              <div className="text-xs sm:text-sm text-slate-600">Documented Vulnerabilities</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-1 sm:mb-2 break-words">RSA, ECC, DH</div>
              <div className="text-xs sm:text-sm text-slate-600">Critical Algorithms at Risk</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-1 sm:mb-2">~10 Years</div>
              <div className="text-xs sm:text-sm text-slate-600">Estimated Timeline for Q-Day</div>
            </div>
          </div>
        </div>

        {/* Technical Overview */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16 md:mb-20">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">The Quantum Threat</h2>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
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
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">How It Works</h2>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs sm:text-sm font-bold text-slate-700">
                  1
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-1">Community Research</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Security researchers document cryptographic systems vulnerable to quantum attacks with detailed technical analysis.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs sm:text-sm font-bold text-slate-700">
                  2
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-1">Expert Verification</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Submissions undergo peer review to verify technical accuracy before publication to the public database.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs sm:text-sm font-bold text-slate-700">
                  3
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-1">Public Access</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Verified vulnerabilities are published with risk scores, affected protocols, and migration recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-slate-900 rounded-lg p-6 sm:p-8 md:p-12 text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Contribute to Quantum Security Research</h2>
          <p className="text-sm sm:text-base text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Help document the scope of quantum vulnerabilities. Submit your findings to build a comprehensive resource 
            for the cryptographic community.
          </p>
          <Link href="/submit" className="inline-block">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto rounded-none">
              Submit a Vulnerability
            </Button>
          </Link>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Logo className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
              <span className="text-xs sm:text-sm text-slate-600">Quantum Vulnerability Database</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm text-slate-500 text-center md:text-left">
                Community maintained
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
