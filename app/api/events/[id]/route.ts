import { NextRequest, NextResponse } from 'next/server';
import { eventDb } from '@/lib/database/eventService';
import { EventType } from '@/lib/mockData';

// GET /api/events/[id] - Get event by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const event = eventDb.getEventById(id);
    
    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: event 
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

// PUT /api/events/[id] - Update event
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Check if event exists
    const existingEvent = eventDb.getEventById(id);
    if (!existingEvent) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    // Validate event type if provided
    if (body.type && !['gathering', 'guidance'].includes(body.type)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid event type. Must be either "gathering" or "guidance"' 
        },
        { status: 400 }
      );
    }

    // Validate alumni list for guidance events
    if (body.type === 'guidance' && (!body.alumniList || body.alumniList.length === 0)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Alumni list is required for guidance events' 
        },
        { status: 400 }
      );
    }

    // Validate capacity if provided
    if (body.capacity && (typeof body.capacity !== 'number' || body.capacity <= 0)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Capacity must be a positive number' 
        },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: any = {};
    
    if (body.title) updateData.title = body.title.trim();
    if (body.type) updateData.type = body.type as EventType;
    if (body.date) updateData.date = body.date;
    if (body.venue) updateData.venue = body.venue.trim();
    if (body.capacity) updateData.capacity = body.capacity;
    if (body.description) updateData.description = body.description.trim();
    if (body.alumniList !== undefined) updateData.alumniList = body.alumniList;
    if (body.fromYear !== undefined) updateData.fromYear = body.fromYear;
    if (body.toYear !== undefined) updateData.toYear = body.toYear;

    const updatedEvent = eventDb.updateEvent(id, updateData);
    
    return NextResponse.json({
      success: true,
      data: updatedEvent,
      message: 'Event updated successfully'
    });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

// DELETE /api/events/[id] - Delete event
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = eventDb.deleteEvent(id);
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}