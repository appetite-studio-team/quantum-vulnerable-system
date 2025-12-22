import { NextResponse } from 'next/server';
import { fetchVulnerabilities } from '@/lib/appwrite';

export async function GET() {
  try {
    const vulnerabilities = await fetchVulnerabilities();
    return NextResponse.json({ success: true, data: vulnerabilities });
  } catch (error) {
    console.error('Error in vulnerabilities API route:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch vulnerabilities' },
      { status: 500 }
    );
  }
}

