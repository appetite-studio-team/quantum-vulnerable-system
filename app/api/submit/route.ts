import { NextRequest, NextResponse } from 'next/server';
import { submitVulnerability } from '@/lib/appwrite';
import type { VulnerableSystem } from '@/lib/types';

// Force dynamic rendering - don't pre-render at build time
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'description', 'weakness_reason', 'current_cryptography', 'affected_protocols', 'organization', 'quantum_risk_level', 'vulnerability_level', 'score'];
    for (const field of requiredFields) {
      if (!body[field] && body[field] !== 0) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Transform arrays if they're strings
    const data: Omit<VulnerableSystem, 'id' | 'status' | 'discovered_date'> = {
      name: body.name,
      description: body.description,
      system_category: body.system_category || undefined,
      use_case: body.use_case || undefined,
      quantum_risk_level: body.quantum_risk_level,
      vulnerability_level: body.vulnerability_level,
      weakness_reason: body.weakness_reason,
      current_cryptography: Array.isArray(body.current_cryptography) 
        ? body.current_cryptography 
        : typeof body.current_cryptography === 'string'
        ? body.current_cryptography.split(',').map((s: string) => s.trim()).filter(Boolean)
        : [],
      affected_protocols: Array.isArray(body.affected_protocols)
        ? body.affected_protocols
        : typeof body.affected_protocols === 'string'
        ? body.affected_protocols.split(',').map((s: string) => s.trim()).filter(Boolean)
        : [],
      organization: body.organization,
      quantumx_recommendation: body.quantumx_recommendation || undefined,
      mitigation: body.mitigation || undefined,
      score: typeof body.score === 'number' ? body.score : parseFloat(body.score) || 5,
    };

    const result = await submitVulnerability(data);
    
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to submit vulnerability' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in submit API route:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

