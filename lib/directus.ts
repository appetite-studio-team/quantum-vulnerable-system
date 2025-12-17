import { createDirectus, rest, readItems, createItem } from '@directus/sdk';

export interface VulnerableSystem {
  id: string;
  name: string; // System/Asset name (e.g., "Digital Identity", "Banking Systems")
  description: string; // Detailed technical description
  
  // Categorization
  system_category?: string; // e.g., "Banking", "Healthcare", "IoT", "Cloud", "Satellite"
  use_case?: string; // e.g., "Authentication", "Secure transactions", "Long-term data protection"
  
  // Risk Assessment
  quantum_risk_level: 'quantum-safe' | 'at-risk' | 'quantum-broken';
  vulnerability_level: 'critical' | 'high' | 'medium' | 'low';
  score: number;
  weakness_reason: string; // Short snapshot of why system is exposed
  
  // Cryptography Details
  current_cryptography: string[]; // e.g., ["RSA-2048", "ECC (P-256)", "AES-128"]
  affected_protocols: string[];
  
  // Recommendations
  quantumx_recommendation?: string; // PQC migration recommendations
  mitigation?: string; // General mitigation strategies
  
  // Metadata
  discovered_date: string;
  organization: string;
  status: 'verified' | 'pending' | 'under-review';
}

interface DirectusSchema {
  vulnerable_systems: VulnerableSystem[];
}

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';

// Create Directus client
const client = createDirectus<DirectusSchema>(directusUrl).with(rest());

// Dummy data for development/demo purposes
const dummyData: VulnerableSystem[] = [
  {
    id: '1',
    name: 'RSA-2048 Public Key Infrastructure',
    description: 'RSA-2048 is vulnerable to Shor\'s algorithm on fault-tolerant quantum computers. Current estimates suggest a CRQC with ~20 million noisy qubits could break RSA-2048 in under 8 hours. This affects billions of devices and critical infrastructure worldwide.',
    system_category: 'Digital Identity',
    use_case: 'Authentication, Digital Signatures, Secure Communications',
    quantum_risk_level: 'quantum-broken',
    vulnerability_level: 'critical',
    score: 9.8,
    weakness_reason: 'Public-key factorization vulnerable to Shor\'s quantum algorithm - can factor large integers in polynomial time',
    current_cryptography: ['RSA-2048', 'RSA-3072', 'RSA-4096'],
    affected_protocols: ['TLS 1.2', 'SSH', 'PGP', 'S/MIME', 'X.509 Certificates', 'HTTPS'],
    quantumx_recommendation: 'Migrate to hybrid approach:\n• CRYSTALS-Dilithium for signatures\n• CRYSTALS-Kyber for key exchange\n• Implement hybrid TLS 1.3 with PQC cipher suites\n• Timeline: Begin migration immediately, complete within 24 months',
    mitigation: 'Immediate transition to NIST-standardized post-quantum algorithms. Implement hybrid classical-quantum schemes during migration period.',
    discovered_date: '2024-03-15T00:00:00Z',
    organization: 'NIST Post-Quantum Cryptography Project',
    status: 'verified',
  },
  {
    id: '2',
    name: 'Elliptic Curve Cryptography (ECC-256)',
    description: 'ECC is vulnerable to modified Shor\'s algorithm. Quantum computers can solve the Elliptic Curve Discrete Logarithm Problem (ECDLP) exponentially faster than classical computers. This affects blockchain, cryptocurrency, and modern authentication systems.',
    system_category: 'Banking & Cryptocurrency',
    use_case: 'Secure transactions, Blockchain consensus, Digital wallets',
    quantum_risk_level: 'quantum-broken',
    vulnerability_level: 'critical',
    score: 9.5,
    weakness_reason: 'Elliptic curve discrete logarithm problem solvable via quantum algorithms - basis of cryptocurrency security compromised',
    current_cryptography: ['ECDSA', 'ECDH', 'secp256k1', 'P-256', 'P-384'],
    affected_protocols: ['Bitcoin', 'Ethereum', 'TLS 1.3 (ECC)', 'Signal Protocol', 'WhatsApp Encryption'],
    quantumx_recommendation: 'Cryptocurrency upgrade path:\n• Bitcoin: Implement Taproot with PQC signatures\n• Ethereum: Move to lattice-based signature schemes\n• General: CRYSTALS-Dilithium or Falcon for signatures\n• Timeline: Critical - begin within 12 months',
    mitigation: 'Transition to lattice-based cryptography (CRYSTALS-Kyber/Dilithium) or hash-based signatures (SPHINCS+). For blockchain: coordinate network-wide upgrade.',
    discovered_date: '2024-02-28T00:00:00Z',
    organization: 'MIT Quantum Computing & Blockchain Lab',
    status: 'verified',
  },
  {
    id: '3',
    name: 'AES-128 Symmetric Encryption',
    description: 'Grover\'s algorithm reduces AES-128\'s effective security from 128 bits to 64 bits. While still computationally intensive, this falls below recommended security margins for long-term data protection in the quantum era.',
    system_category: 'Cloud Storage & Data Protection',
    use_case: 'Long-term data encryption, Secure file storage, Database encryption',
    quantum_risk_level: 'at-risk',
    vulnerability_level: 'high',
    score: 7.2,
    weakness_reason: 'Grover\'s algorithm provides quadratic speedup for key search - reduces 128-bit security to 64-bit equivalent',
    current_cryptography: ['AES-128', 'AES-128-GCM', 'AES-128-CBC'],
    affected_protocols: ['TLS 1.3', 'IPsec', 'WPA3', 'FileVault', 'BitLocker'],
    quantumx_recommendation: 'Upgrade to AES-256 immediately for:\n• Long-term data storage (10+ years retention)\n• High-value assets\n• Government/military systems\n• Healthcare records\nAES-256 provides 128-bit quantum security (Grover-resistant)',
    mitigation: 'Upgrade to AES-256 for adequate post-quantum security. AES-256 reduces to 128-bit strength under quantum attack, which remains secure.',
    discovered_date: '2024-01-10T00:00:00Z',
    organization: 'NIST Cryptographic Standards',
    status: 'verified',
  },
  {
    id: '4',
    name: 'Diffie-Hellman Key Exchange',
    description: 'Classical DH key exchange is completely broken by Shor\'s algorithm, which can efficiently solve the discrete logarithm problem. This affects real-time key establishment for billions of connections daily.',
    system_category: 'IoT & Device Communication',
    use_case: 'Real-time key exchange, Secure device pairing, VPN establishment',
    quantum_risk_level: 'quantum-broken',
    vulnerability_level: 'critical',
    score: 9.2,
    weakness_reason: 'Discrete logarithm problem quantum-solvable - enables passive decryption of past and future communications',
    current_cryptography: ['DH-2048', 'DHE', 'ECDHE'],
    affected_protocols: ['TLS', 'IKE/IPsec', 'SSH', 'Signal Protocol', 'OpenVPN'],
    quantumx_recommendation: 'Immediate migration to PQC key exchange:\n• CRYSTALS-Kyber (NIST standard)\n• Hybrid mode: Classical ECDHE + Kyber\n• For IoT: Consider NTRU or FrodoKEM for constrained devices\n• Update all TLS implementations to support PQC cipher suites',
    mitigation: 'Replace with CRYSTALS-Kyber or other NIST-approved post-quantum key encapsulation mechanisms. Implement hybrid schemes during transition.',
    discovered_date: '2024-04-02T00:00:00Z',
    organization: 'Stanford Cryptography Research Group',
    status: 'verified',
  },
  {
    id: '5',
    name: 'Healthcare PACS Imaging Systems',
    description: 'Picture Archiving and Communication Systems (PACS) in healthcare rely on RSA/ECC for patient data encryption and authentication. Medical imaging data has 50+ year retention requirements, making it vulnerable to "harvest now, decrypt later" attacks.',
    system_category: 'Healthcare',
    use_case: 'Medical imaging storage, Patient data protection, HIPAA compliance',
    quantum_risk_level: 'at-risk',
    vulnerability_level: 'high',
    score: 8.7,
    weakness_reason: 'Long-term medical data retention with RSA/ECC encryption vulnerable to future quantum decryption - HIPAA compliance risk',
    current_cryptography: ['RSA-2048', 'AES-256', 'TLS 1.2'],
    affected_protocols: ['DICOM', 'HL7', 'FHIR', 'Medical VPN'],
    quantumx_recommendation: 'Healthcare-specific migration:\n• Implement PQC for new patient data immediately\n• Re-encrypt existing archives with hybrid PQC+AES-256\n• CRYSTALS-Kyber for data encryption\n• CRYSTALS-Dilithium for digital signatures\n• Maintain audit trails for compliance',
    mitigation: 'Urgent: Re-encrypt stored medical imaging with PQC algorithms. Implement hybrid encryption for all new patient data to maintain HIPAA compliance in quantum era.',
    discovered_date: '2024-03-22T00:00:00Z',
    organization: 'Healthcare Cybersecurity Alliance',
    status: 'verified',
  },
  {
    id: '6',
    name: 'Satellite Communication Networks',
    description: 'Military and commercial satellite systems use RSA/ECC for command authentication and data encryption. These systems have 15-20 year operational lifespans, making them vulnerable throughout their service life.',
    system_category: 'Satellite & Aerospace',
    use_case: 'Satellite command & control, Secure telemetry, GPS authentication',
    quantum_risk_level: 'quantum-broken',
    vulnerability_level: 'critical',
    score: 9.0,
    weakness_reason: 'RSA-based satellite command authentication vulnerable to spoofing - potential for unauthorized control of orbital assets',
    current_cryptography: ['RSA-2048', 'ECDSA P-256', 'AES-128'],
    affected_protocols: ['CCSDS', 'GPS/GNSS', 'Satellite TT&C', 'Space-to-Ground Links'],
    quantumx_recommendation: 'Critical aerospace migration:\n• Firmware updates to existing satellites for PQC support\n• CRYSTALS-Dilithium for command authentication\n• Hybrid AES-256 + quantum key distribution (QKD) where feasible\n• Ground station upgrades within 18 months\n• New satellite launches must include PQC from design phase',
    mitigation: 'Deploy firmware updates enabling PQC. For new satellites, integrate quantum-resistant cryptography at design phase. Consider QKD for critical military systems.',
    discovered_date: '2024-02-15T00:00:00Z',
    organization: 'Space Force Cyber Command',
    status: 'verified',
  },
];

/**
 * Fetch all published (verified) vulnerabilities
 */
export async function fetchVulnerabilities(): Promise<VulnerableSystem[]> {
  try {
    const items = await client.request(
      readItems('vulnerable_systems', {
        filter: {
          status: {
            _eq: 'verified'
          }
        },
        sort: ['-score', '-discovered_date']
      })
    );
    return items;
  } catch (error) {
    console.warn('Directus not available, using dummy data:', error);
    // Return dummy data when Directus is not available
    return dummyData;
  }
}

/**
 * Submit a new vulnerability (will be pending by default)
 */
export async function submitVulnerability(
  data: Omit<VulnerableSystem, 'id' | 'status' | 'discovered_date'>
): Promise<{ success: boolean; error?: string }> {
  try {
    await client.request(
      createItem('vulnerable_systems', {
        ...data,
        status: 'pending',
        discovered_date: new Date().toISOString()
      })
    );
    return { success: true };
  } catch (error) {
    console.error('Error submitting vulnerability:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit vulnerability'
    };
  }
}
