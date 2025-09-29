import { Event, EventType } from './mockData';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

export interface CreateEventData {
  title: string;
  type: EventType;
  date: string;
  venue: string;
  capacity: number;
  description: string;
  alumniList: string[];
  fromYear?: number | null;
  toYear?: number | null;
}

export interface UpdateEventData extends Partial<CreateEventData> {}

class EventService {
  private baseUrl = '/api/events';

  async getAllEvents(): Promise<Event[]> {
    try {
      const response = await fetch(this.baseUrl);
      const result: ApiResponse<Event[]> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch events');
      }
      
      return result.data || [];
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  async getEventById(id: string): Promise<Event> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      const result: ApiResponse<Event> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch event');
      }
      
      if (!result.data) {
        throw new Error('Event not found');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error fetching event:', error);
      throw error;
    }
  }

  async createEvent(eventData: CreateEventData): Promise<Event> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      const result: ApiResponse<Event> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to create event');
      }
      
      if (!result.data) {
        throw new Error('No event data returned');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  async updateEvent(id: string, updateData: UpdateEventData): Promise<Event> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const result: ApiResponse<Event> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to update event');
      }
      
      if (!result.data) {
        throw new Error('No event data returned');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }

  async deleteEvent(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      });

      const result: ApiResponse<void> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }
}

export const eventService = new EventService();