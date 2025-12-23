import { NextRequest, NextResponse } from 'next/server';
import { fetchAllVulnerabilities, createVulnerability } from '@/lib/appwrite';
import type { VulnerableSystem } from '@/lib/types';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET - Fetch all vulnerabilities (admin)
export async function GET() {
  try {
    // TODO: Add authentication check here
    // For now, we'll allow access but in production, verify the session token
    
    const vulnerabilities = await fetchAllVulnerabilities();
    return NextResponse.json({ success: true, data: vulnerabilities });
  } catch (error) {
    console.error('Error in admin vulnerabilities API route:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch vulnerabilities' },
      { status: 500 }
    );
  }
}

// POST - Create a new vulnerability (admin)
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check here
    
    const body = await request.json();
    const result = await createVulnerability(body);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    console.error('Error creating vulnerability:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to create vulnerability' },
      { status: 500 }
    );
  }
}

