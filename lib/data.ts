export interface VulnerableSystem {
  id: string;
  name: string;
  description: string;
  vulnerabilityLevel: 'critical' | 'high' | 'medium' | 'low';
  score: number;
  affectedProtocols: string[];
  discoveredDate: string;
  organization: string;
  status: 'verified' | 'pending' | 'under-review';
  mitigation?: string;
}

export const vulnerableSystems: VulnerableSystem[] = [
  {
    id: '1',
    name: 'RSA-2048 Encryption',
    description: 'Vulnerable to Shor\'s algorithm on quantum computers with sufficient qubits. Current estimates suggest breaking within hours using a fault-tolerant quantum computer.',
    vulnerabilityLevel: 'critical',
    score: 9.5,
    affectedProtocols: ['TLS 1.2', 'SSH', 'PGP', 'S/MIME'],
    discoveredDate: '2024-03-15',
    organization: 'Quantum Security Research Lab',
    status: 'verified',
    mitigation: 'Migrate to post-quantum cryptography algorithms (e.g., CRYSTALS-Kyber, CRYSTALS-Dilithium)',
  },
  {
    id: '2',
    name: 'Elliptic Curve Cryptography (ECC-256)',
    description: 'Susceptible to modified Shor\'s algorithm. Quantum attacks can solve ECDLP exponentially faster than classical computers.',
    vulnerabilityLevel: 'critical',
    score: 9.2,
    affectedProtocols: ['ECDSA', 'ECDH', 'Bitcoin', 'Ethereum'],
    discoveredDate: '2024-02-28',
    organization: 'MIT Quantum Computing Lab',
    status: 'verified',
    mitigation: 'Transition to lattice-based or hash-based signature schemes',
  },
  {
    id: '3',
    name: 'AES-128 Symmetric Encryption',
    description: 'Grover\'s algorithm reduces effective key strength by half. AES-128 becomes equivalent to 64-bit security in post-quantum era.',
    vulnerabilityLevel: 'high',
    score: 7.8,
    affectedProtocols: ['TLS 1.3', 'IPsec', 'WPA3'],
    discoveredDate: '2024-01-10',
    organization: 'NIST Post-Quantum Cryptography Team',
    status: 'verified',
    mitigation: 'Upgrade to AES-256 for adequate quantum resistance',
  },
  {
    id: '4',
    name: 'Diffie-Hellman Key Exchange',
    description: 'Classical DH vulnerable to quantum attacks solving discrete logarithm problem efficiently.',
    vulnerabilityLevel: 'critical',
    score: 9.0,
    affectedProtocols: ['TLS', 'IKE', 'SSH'],
    discoveredDate: '2024-04-02',
    organization: 'Stanford Cryptography Group',
    status: 'verified',
    mitigation: 'Replace with quantum-resistant key exchange mechanisms',
  },
  {
    id: '5',
    name: 'SHA-256 Hash Function',
    description: 'Grover\'s algorithm provides quadratic speedup for collision finding, reducing security margin.',
    vulnerabilityLevel: 'medium',
    score: 5.5,
    affectedProtocols: ['Bitcoin Mining', 'Digital Signatures', 'Certificate Authority'],
    discoveredDate: '2024-03-20',
    organization: 'IBM Quantum Research',
    status: 'verified',
    mitigation: 'Consider SHA-384 or SHA-512 for future-proofing',
  },
  {
    id: '6',
    name: 'DSA (Digital Signature Algorithm)',
    description: 'Relies on discrete logarithm problem, completely broken by Shor\'s algorithm on quantum computers.',
    vulnerabilityLevel: 'critical',
    score: 8.9,
    affectedProtocols: ['SSL/TLS Certificates', 'Software Signing', 'Document Authentication'],
    discoveredDate: '2024-02-14',
    organization: 'European Quantum Computing Institute',
    status: 'verified',
    mitigation: 'Migrate to CRYSTALS-Dilithium or other PQC signatures',
  },
  {
    id: '7',
    name: 'McEliece Cryptosystem Implementation',
    description: 'Specific implementation vulnerabilities found in key generation process, though algorithm remains quantum-resistant.',
    vulnerabilityLevel: 'medium',
    score: 6.2,
    affectedProtocols: ['Legacy Post-Quantum Systems'],
    discoveredDate: '2024-04-18',
    organization: 'University of Waterloo',
    status: 'under-review',
    mitigation: 'Update to latest implementation with security patches',
  },
  {
    id: '8',
    name: 'NTRU Lattice-Based Encryption',
    description: 'Recent advances in lattice reduction algorithms show potential weaknesses for certain parameter sets.',
    vulnerabilityLevel: 'low',
    score: 4.3,
    affectedProtocols: ['NTRU Prime', 'Embedded Systems'],
    discoveredDate: '2024-04-25',
    organization: 'Google Quantum AI',
    status: 'pending',
    mitigation: 'Use recommended parameter sets from NIST PQC standards',
  },
  {
    id: '9',
    name: 'Blockchain Consensus Mechanisms',
    description: 'Proof-of-Work systems vulnerable to quantum speedup attacks affecting network security and consensus.',
    vulnerabilityLevel: 'high',
    score: 7.5,
    affectedProtocols: ['Bitcoin PoW', 'Ethereum Classic', 'Litecoin'],
    discoveredDate: '2024-03-08',
    organization: 'Blockchain Security Alliance',
    status: 'verified',
    mitigation: 'Implement quantum-resistant consensus mechanisms',
  },
  {
    id: '10',
    name: 'Legacy VPN Protocols',
    description: 'PPTP and L2TP/IPsec implementations using vulnerable key exchange and encryption methods.',
    vulnerabilityLevel: 'high',
    score: 8.1,
    affectedProtocols: ['PPTP', 'L2TP/IPsec', 'IKEv1'],
    discoveredDate: '2024-01-22',
    organization: 'Cybersecurity Infrastructure Agency',
    status: 'verified',
    mitigation: 'Upgrade to WireGuard or OpenVPN with PQC support',
  },
];

export function getVulnerabilityColor(level: VulnerableSystem['vulnerabilityLevel']) {
  const colors = {
    critical: 'text-red-700 bg-red-50 border-red-200',
    high: 'text-orange-700 bg-orange-50 border-orange-200',
    medium: 'text-yellow-700 bg-yellow-50 border-yellow-200',
    low: 'text-green-700 bg-green-50 border-green-200',
  };
  return colors[level];
}

export function getStatusColor(status: VulnerableSystem['status']) {
  const colors = {
    verified: 'text-green-700 bg-green-50',
    pending: 'text-yellow-700 bg-yellow-50',
    'under-review': 'text-blue-700 bg-blue-50',
  };
  return colors[status];
}
