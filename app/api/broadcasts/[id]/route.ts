import { NextRequest, NextResponse } from 'next/server';
import { broadcastDb } from '@/lib/database/broadcastService';

// GET /api/broadcasts/[id] - Get broadcast by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const broadcast = broadcastDb.getBroadcastById(id);
    
    if (!broadcast) {
      return NextResponse.json(
        { success: false, error: 'Broadcast not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: broadcast 
    });
  } catch (error) {
    console.error('Error fetching broadcast:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch broadcast' },
      { status: 500 }
    );
  }
}

// PUT /api/broadcasts/[id] - Update broadcast
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Check if broadcast exists
    const existingBroadcast = broadcastDb.getBroadcastById(id);
    if (!existingBroadcast) {
      return NextResponse.json(
        { success: false, error: 'Broadcast not found' },
        { status: 404 }
      );
    }

    // Validate year range if provided
    if (body.fromYear !== undefined && body.toYear !== undefined) {
      if (typeof body.fromYear !== 'number' || typeof body.toYear !== 'number') {
        return NextResponse.json(
          { 
            success: false, 
            error: 'fromYear and toYear must be numbers' 
          },
          { status: 400 }
        );
      }

      if (body.fromYear > body.toYear) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'fromYear cannot be greater than toYear' 
          },
          { status: 400 }
        );
      }
    }

    // Prepare update data
    const updateData: any = {};
    
    if (body.title) updateData.title = body.title.trim();
    if (body.body) updateData.body = body.body.trim();
    if (body.fromYear !== undefined) updateData.fromYear = body.fromYear;
    if (body.toYear !== undefined) updateData.toYear = body.toYear;

    const updatedBroadcast = broadcastDb.updateBroadcast(id, updateData);
    
    return NextResponse.json({
      success: true,
      data: updatedBroadcast,
      message: 'Broadcast updated successfully'
    });
  } catch (error) {
    console.error('Error updating broadcast:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update broadcast' },
      { status: 500 }
    );
  }
}

// DELETE /api/broadcasts/[id] - Delete broadcast
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = broadcastDb.deleteBroadcast(id);
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Broadcast not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Broadcast deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting broadcast:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete broadcast' },
      { status: 500 }
    );
  }
}