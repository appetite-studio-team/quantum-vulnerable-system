import { NextRequest, NextResponse } from 'next/server';
import { updateVulnerabilityStatus } from '@/lib/appwrite';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// PATCH - Update vulnerability status (admin)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // TODO: Add authentication check here
    
    const { id } = await params;
    const body = await request.json();
    const { status } = body;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Document ID is required' },
        { status: 400 }
      );
    }
    
    if (!status) {
      return NextResponse.json(
        { success: false, error: 'Status is required' },
        { status: 400 }
      );
    }
    
    const result = await updateVulnerabilityStatus(id, status);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating vulnerability status:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to update vulnerability status' },
      { status: 500 }
    );
  }
}

