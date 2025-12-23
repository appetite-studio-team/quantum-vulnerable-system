import { Client, Databases, Query, ID } from 'node-appwrite';
import type { VulnerableSystem } from './types';

// Re-export type for compatibility
export type { VulnerableSystem } from './types';

// Appwrite document structure (with their field naming)
interface AppwriteDocument {
  $id: string;
  $createdAt: string;
  'Asset-Name': string;
  'System-Category': string;
  'Use-Case': string;
  'Organization': string;
  'Weakness-Reason': string;
  'Detailed-Technical-Description': string;
  'Current-Cryptography': string;
  'Affected-Protocols': string;
  'Quantum-Risk-Level': string;
  'Vulnerability-Severity': string;
  'Risk-Score': number;
  'QuantumX-Recommendation': string;
  'Recommended-Mitigation': string;
  'entry-status': 'Pending' | 'In-review' | 'Published';
}

// Lazy initialization of Appwrite client to avoid build-time errors
// Initialize only when actually needed (during API calls, not at module load)
function getAppwriteClient() {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  
  if (!endpoint || !projectId) {
    throw new Error('Appwrite configuration missing: NEXT_PUBLIC_APPWRITE_ENDPOINT and NEXT_PUBLIC_APPWRITE_PROJECT_ID are required');
  }

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId);

  // Set API key for server-side authentication (if provided)
  if (process.env.APPWRITE_API_KEY) {
    client.setKey(process.env.APPWRITE_API_KEY);
  }

  return client;
}

function getDatabases() {
  return new Databases(getAppwriteClient());
}

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || '';

// Dummy data for development/demo purposes (same as before)
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
 * Transform Appwrite document to UI-friendly VulnerableSystem format
 */
function transformFromAppwrite(doc: AppwriteDocument): VulnerableSystem {
  // Map Appwrite status to UI status
  let status: 'verified' | 'pending' | 'under-review';
  if (doc['entry-status'] === 'Published') {
    status = 'verified';
  } else if (doc['entry-status'] === 'In-review') {
    status = 'under-review';
  } else {
    status = 'pending';
  }

  return {
    id: doc.$id,
    name: doc['Asset-Name'],
    description: doc['Detailed-Technical-Description'],
    system_category: doc['System-Category'],
    use_case: doc['Use-Case'],
    quantum_risk_level: doc['Quantum-Risk-Level'] as 'quantum-safe' | 'at-risk' | 'quantum-broken',
    vulnerability_level: doc['Vulnerability-Severity'] as 'critical' | 'high' | 'medium' | 'low',
    score: doc['Risk-Score'],
    weakness_reason: doc['Weakness-Reason'],
    current_cryptography: doc['Current-Cryptography'] 
      ? doc['Current-Cryptography'].split(',').map(s => s.trim()) 
      : [],
    affected_protocols: doc['Affected-Protocols'] 
      ? doc['Affected-Protocols'].split(',').map(s => s.trim()) 
      : [],
    quantumx_recommendation: doc['QuantumX-Recommendation'],
    mitigation: doc['Recommended-Mitigation'],
    discovered_date: doc.$createdAt,
    organization: doc['Organization'],
    status,
  };
}

/**
 * Transform VulnerableSystem to Appwrite document format
 */
function transformToAppwrite(
  data: Omit<VulnerableSystem, 'id' | 'status' | 'discovered_date'>
): Omit<AppwriteDocument, '$id' | '$createdAt' | 'entry-status'> {
  return {
    'Asset-Name': data.name,
    'Detailed-Technical-Description': data.description,
    'System-Category': data.system_category || '',
    'Use-Case': data.use_case || '',
    'Quantum-Risk-Level': data.quantum_risk_level,
    'Vulnerability-Severity': data.vulnerability_level,
    'Risk-Score': Math.round(data.score), // Ensure integer as per Appwrite schema
    'Weakness-Reason': data.weakness_reason,
    'Current-Cryptography': data.current_cryptography.join(', '),
    'Affected-Protocols': data.affected_protocols.join(', '),
    'QuantumX-Recommendation': data.quantumx_recommendation || '',
    'Recommended-Mitigation': data.mitigation || '',
    'Organization': data.organization,
  };
}

/**
 * Fetch all published (verified) vulnerabilities
 */
export async function fetchVulnerabilities(): Promise<VulnerableSystem[]> {
  try {
    // Only initialize Appwrite client when actually needed (not at build time)
    if (!DATABASE_ID || !COLLECTION_ID) {
      console.warn('Appwrite configuration missing, using dummy data');
      return dummyData;
    }

    const databases = getDatabases();
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.equal('entry-status', 'Published'),
        Query.orderDesc('Risk-Score'),
        Query.orderDesc('$createdAt'),
        Query.limit(100) // Increase limit to fetch more published documents
      ]
    );
    
    // Transform documents with error handling
    const transformed: VulnerableSystem[] = [];
    for (const doc of response.documents) {
      try {
        transformed.push(transformFromAppwrite(doc as unknown as AppwriteDocument));
      } catch (error) {
        console.error(`Error transforming document ${doc.$id}:`, error);
        // Continue processing other documents even if one fails
      }
    }
    
    // Warn if there are more published documents than fetched
    if (response.total > response.documents.length) {
      console.warn(`Total published documents: ${response.total}, but only fetched ${response.documents.length}. Consider implementing pagination.`);
    }
    
    return transformed;
  } catch (error) {
    console.error('Error fetching vulnerabilities:', error);
    console.warn('Appwrite not available, using dummy data');
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
    // Only initialize Appwrite client when actually needed (not at build time)
    if (!DATABASE_ID || !COLLECTION_ID) {
      return {
        success: false,
        error: 'Appwrite configuration missing'
      };
    }

    const databases = getDatabases();
    const appwriteData = transformToAppwrite(data);
    
    await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        ...appwriteData,
        'entry-status': 'Pending'
      }
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

/**
 * Fetch a specific vulnerability by ID (admin)
 */
export async function fetchVulnerabilityById(id: string): Promise<VulnerableSystem | null> {
  try {
    if (!DATABASE_ID || !COLLECTION_ID) {
      console.warn('Appwrite configuration missing');
      return null;
    }

    const databases = getDatabases();
    const doc = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      id
    );
    
    return transformFromAppwrite(doc as unknown as AppwriteDocument);
  } catch (error) {
    console.error(`Error fetching vulnerability ${id}:`, error);
    return null;
  }
}

/**
 * Fetch all vulnerabilities (admin - includes all statuses)
 */
export async function fetchAllVulnerabilities(): Promise<VulnerableSystem[]> {
  try {
    if (!DATABASE_ID || !COLLECTION_ID) {
      console.warn('Appwrite configuration missing, using dummy data');
      return dummyData;
    }

    const databases = getDatabases();
    
    // Fetch with a high limit to get all documents (Appwrite default is 25)
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.orderDesc('Risk-Score'),
        Query.orderDesc('$createdAt'),
        Query.limit(100) // Increase limit to fetch more documents
      ]
    );
    
    // Transform documents with error handling
    const transformed: VulnerableSystem[] = [];
    for (const doc of response.documents) {
      try {
        transformed.push(transformFromAppwrite(doc as unknown as AppwriteDocument));
      } catch (error) {
        console.error(`Error transforming document ${doc.$id}:`, error);
        // Continue processing other documents even if one fails
      }
    }
    
    // If there are more documents, fetch them (pagination)
    if (response.total > response.documents.length) {
      console.warn(`Total documents: ${response.total}, but only fetched ${response.documents.length}. Consider implementing pagination.`);
    }
    
    return transformed;
  } catch (error) {
    console.error('Error fetching all vulnerabilities:', error);
    console.warn('Appwrite not available, using dummy data');
    return dummyData;
  }
}

/**
 * Create a new vulnerability entry (admin)
 */
export async function createVulnerability(
  data: Omit<VulnerableSystem, 'id' | 'discovered_date' | 'status'> & { status?: 'Pending' | 'In-review' | 'Published' | 'verified' | 'pending' | 'under-review' }
): Promise<{ success: boolean; error?: string; id?: string }> {
  try {
    if (!DATABASE_ID || !COLLECTION_ID) {
      return {
        success: false,
        error: 'Appwrite configuration missing'
      };
    }

    const databases = getDatabases();
    const status = data.status;
    const vulnerabilityData: Omit<VulnerableSystem, 'id' | 'status' | 'discovered_date'> = {
      name: data.name,
      description: data.description,
      system_category: data.system_category,
      use_case: data.use_case,
      quantum_risk_level: data.quantum_risk_level,
      vulnerability_level: data.vulnerability_level,
      score: data.score,
      weakness_reason: data.weakness_reason,
      current_cryptography: data.current_cryptography,
      affected_protocols: data.affected_protocols,
      quantumx_recommendation: data.quantumx_recommendation,
      mitigation: data.mitigation,
      organization: data.organization,
    };
    
    // Map UI status to Appwrite status
    let entryStatus: 'Pending' | 'In-review' | 'Published' = 'Pending';
    if (status === 'verified') {
      entryStatus = 'Published';
    } else if (status === 'under-review') {
      entryStatus = 'In-review';
    } else if (status === 'pending') {
      entryStatus = 'Pending';
    } else if (status) {
      entryStatus = status;
    }

    const appwriteData = transformToAppwrite(vulnerabilityData);
    const documentId = ID.unique();
    
    await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      documentId,
      {
        ...appwriteData,
        'entry-status': entryStatus
      }
    );
    
    return { success: true, id: documentId };
  } catch (error) {
    console.error('Error creating vulnerability:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create vulnerability'
    };
  }
}

/**
 * Update a vulnerability entry (admin)
 */
export async function updateVulnerability(
  id: string,
  data: Partial<Omit<VulnerableSystem, 'id' | 'discovered_date'>> & { status?: 'Pending' | 'In-review' | 'Published' | 'verified' | 'pending' | 'under-review' }
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!DATABASE_ID || !COLLECTION_ID) {
      return {
        success: false,
        error: 'Appwrite configuration missing'
      };
    }

    const databases = getDatabases();
    const { status, ...updateData } = data;
    
    const updatePayload: any = {};
    
    // Transform fields if provided
    if (updateData.name) updatePayload['Asset-Name'] = updateData.name;
    if (updateData.description) updatePayload['Detailed-Technical-Description'] = updateData.description;
    if (updateData.system_category) updatePayload['System-Category'] = updateData.system_category;
    if (updateData.use_case) updatePayload['Use-Case'] = updateData.use_case;
    if (updateData.quantum_risk_level) updatePayload['Quantum-Risk-Level'] = updateData.quantum_risk_level;
    if (updateData.vulnerability_level) updatePayload['Vulnerability-Severity'] = updateData.vulnerability_level;
    if (updateData.score !== undefined) updatePayload['Risk-Score'] = Math.round(updateData.score);
    if (updateData.weakness_reason) updatePayload['Weakness-Reason'] = updateData.weakness_reason;
    if (updateData.current_cryptography) updatePayload['Current-Cryptography'] = Array.isArray(updateData.current_cryptography) 
      ? updateData.current_cryptography.join(', ') 
      : updateData.current_cryptography;
    if (updateData.affected_protocols) updatePayload['Affected-Protocols'] = Array.isArray(updateData.affected_protocols)
      ? updateData.affected_protocols.join(', ')
      : updateData.affected_protocols;
    if (updateData.quantumx_recommendation) updatePayload['QuantumX-Recommendation'] = updateData.quantumx_recommendation;
    if (updateData.mitigation) updatePayload['Recommended-Mitigation'] = updateData.mitigation;
    if (updateData.organization) updatePayload['Organization'] = updateData.organization;
    
    // Handle status update
    if (status) {
      let entryStatus: 'Pending' | 'In-review' | 'Published';
      if (status === 'verified') {
        entryStatus = 'Published';
      } else if (status === 'under-review') {
        entryStatus = 'In-review';
      } else if (status === 'pending') {
        entryStatus = 'Pending';
      } else {
        entryStatus = status as 'Pending' | 'In-review' | 'Published';
      }
      updatePayload['entry-status'] = entryStatus;
    }
    
    await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      id,
      updatePayload
    );
    
    return { success: true };
  } catch (error) {
    console.error('Error updating vulnerability:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update vulnerability'
    };
  }
}

/**
 * Delete a vulnerability entry (admin)
 */
export async function deleteVulnerability(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!DATABASE_ID || !COLLECTION_ID) {
      return {
        success: false,
        error: 'Appwrite configuration missing'
      };
    }

    const databases = getDatabases();
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting vulnerability:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete vulnerability'
    };
  }
}

/**
 * Update vulnerability status (admin)
 */
export async function updateVulnerabilityStatus(
  id: string,
  status: 'Pending' | 'In-review' | 'Published' | 'verified' | 'pending' | 'under-review'
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!DATABASE_ID || !COLLECTION_ID) {
      return {
        success: false,
        error: 'Appwrite configuration missing'
      };
    }

    const databases = getDatabases();
    
    // Map UI status to Appwrite status
    let entryStatus: 'Pending' | 'In-review' | 'Published';
    if (status === 'verified') {
      entryStatus = 'Published';
    } else if (status === 'under-review') {
      entryStatus = 'In-review';
    } else if (status === 'pending') {
      entryStatus = 'Pending';
    } else {
      entryStatus = status as 'Pending' | 'In-review' | 'Published';
    }
    
    await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      id,
      {
        'entry-status': entryStatus
      }
    );
    
    return { success: true };
  } catch (error) {
    console.error('Error updating vulnerability status:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update vulnerability status'
    };
  }
}
