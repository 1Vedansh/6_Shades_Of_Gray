"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Event, mockAlumni } from '@/lib/mockData';
import { eventService, CreateEventData } from '@/lib/eventService';

interface EventContextType {
  events: Event[];
  alumni: typeof mockAlumni;
  loading: boolean;
  error: string | null;
  addEvent: (event: CreateEventData) => Promise<void>;
  updateEvent: (id: string, updateData: Partial<CreateEventData>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  refreshEvents: () => Promise<void>;
  expandedEventId: string | null;
  setExpandedEventId: (id: string | null) => void;
}

const EventContext = createContext<EventContextType | null>(null);

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const alumni = mockAlumni;

  // Load events from API on mount
  useEffect(() => {
    refreshEvents();
  }, []);

  const refreshEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedEvents = await eventService.getAllEvents();
      setEvents(fetchedEvents);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load events');
      console.error('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (eventData: CreateEventData) => {
    try {
      setError(null);
      const newEvent = await eventService.createEvent(eventData);
      setEvents(prev => [newEvent, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create event');
      throw err;
    }
  };

  const updateEvent = async (id: string, updateData: Partial<CreateEventData>) => {
    try {
      setError(null);
      const updatedEvent = await eventService.updateEvent(id, updateData);
      setEvents(prev => prev.map(event => 
        event.id === id ? updatedEvent : event
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update event');
      throw err;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      setError(null);
      await eventService.deleteEvent(id);
      setEvents(prev => prev.filter(event => event.id !== id));
      
      // Close expanded view if the deleted event was expanded
      if (expandedEventId === id) {
        setExpandedEventId(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete event');
      throw err;
    }
  };

  return (
    <EventContext.Provider value={{
      events,
      alumni,
      loading,
      error,
      addEvent,
      updateEvent,
      deleteEvent,
      refreshEvents,
      expandedEventId,
      setExpandedEventId
    }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within EventProvider');
  }
  return context;
}