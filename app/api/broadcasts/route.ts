import { NextRequest, NextResponse } from 'next/server';
import { broadcastDb } from '@/lib/database/broadcastService';

// GET /api/broadcasts - Fetch all broadcasts with optional date filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fromDate = searchParams.get('fromDate') || undefined;
    const toDate = searchParams.get('toDate') || undefined;

    const broadcasts = broadcastDb.getAllBroadcasts(fromDate, toDate);
    
    return NextResponse.json({ 
      success: true, 
      data: broadcasts,
      count: broadcasts.length
    });
  } catch (error) {
    console.error('Error fetching broadcasts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch broadcasts' },
      { status: 500 }
    );
  }
}

// POST /api/broadcasts - Create new broadcast
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { title, body: broadcastBody, fromYear, toYear } = body;
    
    if (!title || !broadcastBody || fromYear === undefined || toYear === undefined) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: title, body, fromYear, toYear' 
        },
        { status: 400 }
      );
    }

    // Validate year range
    if (typeof fromYear !== 'number' || typeof toYear !== 'number') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'fromYear and toYear must be numbers' 
        },
        { status: 400 }
      );
    }

    if (fromYear > toYear) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'fromYear cannot be greater than toYear' 
        },
        { status: 400 }
      );
    }

    const currentYear = new Date().getFullYear();
    if (fromYear < 1900 || fromYear > currentYear + 10 || toYear < 1900 || toYear > currentYear + 10) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid year range. Years must be between 1900 and ' + (currentYear + 10)
        },
        { status: 400 }
      );
    }

    // Create the broadcast
    const broadcastData = {
      title: title.trim(),
      body: broadcastBody.trim(),
      fromYear,
      toYear
    };

    const newBroadcast = broadcastDb.createBroadcast(broadcastData);
    
    return NextResponse.json(
      { 
        success: true, 
        data: newBroadcast,
        message: 'Broadcast created successfully' 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating broadcast:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create broadcast' },
      { status: 500 }
    );
  }
}