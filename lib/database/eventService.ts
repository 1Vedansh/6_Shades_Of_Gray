import fs from 'fs';
import path from 'path';
import { Event } from '@/lib/mockData';

const DB_PATH = path.join(process.cwd(), 'lib', 'database', 'events.json');

interface DatabaseData {
  events: Event[];
}

// Ensure database file exists
function ensureDbExists() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initialData: DatabaseData = { events: [] };
      fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
    }
  } catch (error) {
    console.error('Error ensuring database exists:', error);
  }
}

// Read database
function readDatabase(): DatabaseData {
  try {
    ensureDbExists();
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { events: [] };
  }
}

// Write database
function writeDatabase(data: DatabaseData): void {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing database:', error);
    throw new Error('Failed to write to database');
  }
}

// Event database operations
export const eventDb = {
  // Get all events
  getAllEvents(): Event[] {
    const db = readDatabase();
    return db.events.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
  },

  // Get event by ID
  getEventById(id: string): Event | null {
    const db = readDatabase();
    return db.events.find(event => event.id === id) || null;
  },

  // Create new event
  createEvent(eventData: Omit<Event, 'id' | 'rsvp' | 'dateTime'>): Event {
    const db = readDatabase();
    
    const newEvent: Event = {
      ...eventData,
      id: `ev_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      rsvp: 0,
      dateTime: new Date().toISOString()
    };

    db.events.push(newEvent);
    writeDatabase(db);
    
    return newEvent;
  },

  // Update event
  updateEvent(id: string, updateData: Partial<Omit<Event, 'id' | 'dateTime'>>): Event | null {
    const db = readDatabase();
    const eventIndex = db.events.findIndex(event => event.id === id);
    
    if (eventIndex === -1) {
      return null;
    }

    db.events[eventIndex] = {
      ...db.events[eventIndex],
      ...updateData
    };

    writeDatabase(db);
    return db.events[eventIndex];
  },

  // Delete event
  deleteEvent(id: string): boolean {
    const db = readDatabase();
    const eventIndex = db.events.findIndex(event => event.id === id);
    
    if (eventIndex === -1) {
      return false;
    }

    db.events.splice(eventIndex, 1);
    writeDatabase(db);
    return true;
  }
};