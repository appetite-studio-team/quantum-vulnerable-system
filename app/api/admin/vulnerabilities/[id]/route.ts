import { NextRequest, NextResponse } from 'next/server';
import { updateVulnerability, deleteVulnerability } from '@/lib/appwrite';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// PUT - Update a vulnerability (admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // TODO: Add authentication check here
    
    const { id } = await params;
    const body = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Document ID is required' },
        { status: 400 }
      );
    }
    
    const result = await updateVulnerability(id, body);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating vulnerability:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to update vulnerability' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a vulnerability (admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // TODO: Add authentication check here
    
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Document ID is required' },
        { status: 400 }
      );
    }
    
    const result = await deleteVulnerability(id);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting vulnerability:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to delete vulnerability' },
      { status: 500 }
    );
  }
}

