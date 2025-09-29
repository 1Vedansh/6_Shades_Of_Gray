"use client";
import React from 'react';
import { Calendar, MapPin, Users, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { Event } from '@/lib/mockData';

interface StudentEventCardProps {
  event: Event;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function StudentEventCard({ event, isExpanded, onToggleExpand }: StudentEventCardProps) {
  const getEventTypeDisplay = (type: string) => {
    return type === 'gathering' ? 'Alumni Gathering' : 'Guidance Session';
  };

  const getEventTypeColor = (type: string) => {
    return type === 'gathering' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-lg">
      {/* Always Visible Header */}
      <div 
        className="p-6 cursor-pointer"
        onClick={onToggleExpand}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                {getEventTypeDisplay(event.type)}
              </span>
            </div>
            
            {/* Always visible basic info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{formatTime(event.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{event.venue}</span>
              </div>
            </div>
          </div>
          
          <div className="ml-4">
            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-100">
          <div className="pt-4 space-y-4">
            {/* Event Details Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Users className="h-4 w-4 text-blue-500" />
                <span><strong>Capacity:</strong> {event.capacity} attendees</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Users className="h-4 w-4 text-green-500" />
                <span><strong>RSVP Count:</strong> {event.rsvp} registered</span>
              </div>
            </div>

            {/* Alumni list for guidance events */}
            {event.type === 'guidance' && event.alumniList && event.alumniList.length > 0 && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Featured Alumni Mentors
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {event.alumniList.map((alumniName, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 p-2 bg-white rounded-lg border border-green-100"
                    >
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-semibold text-green-700">
                        {alumniName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <span className="text-gray-800 font-medium">{alumniName}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Event Description */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Event Description</h4>
              <div className="max-h-40 overflow-y-auto">
                <div className="text-gray-700 leading-relaxed text-sm space-y-2">
                  {event.description.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Event Stats */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                Updated: {new Date(event.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Available spots: {event.capacity - event.rsvp}</span>
                <span className={`px-2 py-1 rounded-full ${
                  event.capacity - event.rsvp > 10 ? 'bg-green-100 text-green-700' :
                  event.capacity - event.rsvp > 0 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {event.capacity - event.rsvp > 0 ? 'Available' : 'Full'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}