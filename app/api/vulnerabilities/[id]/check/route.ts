import { NextRequest, NextResponse } from 'next/server';
import { fetchVulnerabilityById } from '@/lib/appwrite';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET - Check if a specific published vulnerability exists
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Document ID is required' },
        { status: 400 }
      );
    }
    
    const vulnerability = await fetchVulnerabilityById(id);
    
    if (!vulnerability) {
      return NextResponse.json(
        { success: false, error: 'Document not found', id },
        { status: 404 }
      );
    }
    
    // Check if it's published
    if (vulnerability.status !== 'verified') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Document is not published', 
          id,
          status: vulnerability.status,
          message: `Document status is "${vulnerability.status}" but needs to be "verified" (Published in Appwrite)`
        },
        { status: 200 }
      );
    }
    
    return NextResponse.json({ success: true, data: vulnerability, isPublished: true });
  } catch (error) {
    console.error('Error checking vulnerability:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to check vulnerability' },
      { status: 500 }
    );
  }
}

