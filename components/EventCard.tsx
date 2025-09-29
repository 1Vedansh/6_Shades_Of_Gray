"use client";
import React from 'react';
import { Calendar, MapPin, Users, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { Event } from '@/lib/mockData';
import { useEvents } from '@/context/EventContext';

interface EventCardProps {
  event: Event;
  showDeleteButton?: boolean;
}

export default function EventCard({ event, showDeleteButton = false }: EventCardProps) {
  const { deleteEvent, expandedEventId, setExpandedEventId } = useEvents();
  const isExpanded = expandedEventId === event.id;

  const handleToggleExpand = () => {
    setExpandedEventId(isExpanded ? null : event.id);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete "${event.title}"?`)) {
      try {
        await deleteEvent(event.id);
      } catch (error) {
        alert('Failed to delete event. Please try again.');
        console.error('Error deleting event:', error);
      }
    }
  };

  const getEventTypeDisplay = (type: string) => {
    return type === 'gathering' ? 'General Alumni Gathering' : 'Guidance/Session';
  };

  const getEventTypeColor = (type: string) => {
    return type === 'gathering' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
  };

  return (
    <div className="card cursor-pointer transition-all duration-200 hover:shadow-lg">
      <div onClick={handleToggleExpand} className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-brand-900">{event.title}</h3>
            {isExpanded ? (
              <ChevronDown className="h-5 w-5 text-brand-700" />
            ) : (
              <ChevronRight className="h-5 w-5 text-brand-700" />
            )}
          </div>
          
          {!isExpanded && (
            <div className="flex items-center gap-4 text-sm text-brand-700">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{event.venue}</span>
              </div>
            </div>
          )}
        </div>
        
        {showDeleteButton && (
          <button
            onClick={handleDelete}
            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Event"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-brand-200 space-y-4 max-h-96 overflow-y-auto">
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                {getEventTypeDisplay(event.type)}
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-brand-700">
                <Calendar className="h-4 w-4" />
                <span><strong>Date:</strong> {event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-brand-700">
                <MapPin className="h-4 w-4" />
                <span><strong>Venue:</strong> {event.venue}</span>
              </div>
              <div className="flex items-center gap-2 text-brand-700">
                <Users className="h-4 w-4" />
                <span><strong>Capacity:</strong> {event.capacity}</span>
              </div>
              <div className="flex items-center gap-2 text-brand-700">
                <Users className="h-4 w-4" />
                <span><strong>RSVP:</strong> {event.rsvp}</span>
              </div>
            </div>

            {event.type === 'guidance' && event.alumniList.length > 0 && (
              <div className="bg-brand-50 p-3 rounded-lg">
                <h4 className="font-medium text-brand-900 mb-2">Featured Alumni:</h4>
                <div className="flex flex-wrap gap-2">
                  {event.alumniList.map((alumniName, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-brand-200 text-brand-800 rounded-full text-sm"
                    >
                      {alumniName}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium text-brand-900 mb-2">Description:</h4>
              <p className="text-brand-700 leading-relaxed">{event.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}