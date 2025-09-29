import fs from 'fs';
import path from 'path';

export interface Broadcast {
  id: string;
  title: string;
  body: string;
  dateTime: string;
  fromYear: number;
  toYear: number;
}

const DB_PATH = path.join(process.cwd(), 'lib', 'database', 'broadcasts.json');

interface DatabaseData {
  broadcasts: Broadcast[];
}

// Ensure database file exists
function ensureDbExists() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initialData: DatabaseData = { broadcasts: [] };
      fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
    }
  } catch (error) {
    console.error('Error ensuring broadcast database exists:', error);
  }
}

// Read database
function readDatabase(): DatabaseData {
  try {
    ensureDbExists();
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading broadcast database:', error);
    return { broadcasts: [] };
  }
}

// Write database
function writeDatabase(data: DatabaseData): void {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing broadcast database:', error);
    throw new Error('Failed to write to broadcast database');
  }
}

// Broadcast database operations
export const broadcastDb = {
  // Get all broadcasts with optional date filtering
  getAllBroadcasts(fromDate?: string, toDate?: string): Broadcast[] {
    const db = readDatabase();
    let broadcasts = db.broadcasts.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());

    // Apply date filtering if provided
    if (fromDate || toDate) {
      broadcasts = broadcasts.filter(broadcast => {
        const broadcastDate = new Date(broadcast.dateTime);
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;

        if (from && to) {
          return broadcastDate >= from && broadcastDate <= to;
        } else if (from) {
          return broadcastDate >= from;
        } else if (to) {
          return broadcastDate <= to;
        }
        return true;
      });
    }

    return broadcasts;
  },

  // Get broadcast by ID
  getBroadcastById(id: string): Broadcast | null {
    const db = readDatabase();
    return db.broadcasts.find(broadcast => broadcast.id === id) || null;
  },

  // Create new broadcast
  createBroadcast(broadcastData: Omit<Broadcast, 'id' | 'dateTime'>): Broadcast {
    const db = readDatabase();
    
    const newBroadcast: Broadcast = {
      ...broadcastData,
      id: `bc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      dateTime: new Date().toISOString()
    };

    db.broadcasts.unshift(newBroadcast); // Add to beginning for chronological order
    writeDatabase(db);
    
    return newBroadcast;
  },

  // Update broadcast
  updateBroadcast(id: string, updateData: Partial<Omit<Broadcast, 'id' | 'dateTime'>>): Broadcast | null {
    const db = readDatabase();
    const broadcastIndex = db.broadcasts.findIndex(broadcast => broadcast.id === id);
    
    if (broadcastIndex === -1) {
      return null;
    }

    db.broadcasts[broadcastIndex] = {
      ...db.broadcasts[broadcastIndex],
      ...updateData
    };

    writeDatabase(db);
    return db.broadcasts[broadcastIndex];
  },

  // Delete broadcast
  deleteBroadcast(id: string): boolean {
    const db = readDatabase();
    const broadcastIndex = db.broadcasts.findIndex(broadcast => broadcast.id === id);
    
    if (broadcastIndex === -1) {
      return false;
    }

    db.broadcasts.splice(broadcastIndex, 1);
    writeDatabase(db);
    return true;
  }
};