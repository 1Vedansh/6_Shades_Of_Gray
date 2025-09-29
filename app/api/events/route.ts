import { NextRequest, NextResponse } from 'next/server';
import { eventDb } from '@/lib/database/eventService';
import { EventType } from '@/lib/mockData';

// GET /api/events - Fetch all events
export async function GET() {
  try {
    const events = eventDb.getAllEvents();
    return NextResponse.json({ 
      success: true, 
      data: events,
      count: events.length
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST /api/events - Create new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { title, type, date, venue, capacity, description } = body;
    
    if (!title || !type || !date || !venue || !description) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: title, type, date, venue, description' 
        },
        { status: 400 }
      );
    }

    // Validate event type
    if (!['gathering', 'guidance'].includes(type)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid event type. Must be either "gathering" or "guidance"' 
        },
        { status: 400 }
      );
    }

    // Validate alumni list for guidance events
    if (type === 'guidance' && (!body.alumniList || body.alumniList.length === 0)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Alumni list is required for guidance events' 
        },
        { status: 400 }
      );
    }

    // Validate capacity
    if (capacity && (typeof capacity !== 'number' || capacity <= 0)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Capacity must be a positive number' 
        },
        { status: 400 }
      );
    }

    // Create the event
    const eventData = {
      title: title.trim(),
      type: type as EventType,
      date,
      venue: venue.trim(),
      capacity: capacity || 100,
      description: description.trim(),
      alumniList: body.alumniList || [],
      fromYear: body.fromYear || null,
      toYear: body.toYear || null
    };

    const newEvent = eventDb.createEvent(eventData);
    
    return NextResponse.json(
      { 
        success: true, 
        data: newEvent,
        message: 'Event created successfully' 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create event' },
      { status: 500 }
    );
  }
}