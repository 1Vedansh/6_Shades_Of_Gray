"use client";
import Navbar from "@/components/Navbar";
import StudentEventCard from "@/components/StudentEventCard";
import { useEvents } from "@/context/EventContext";
import { useState } from "react";
import { Calendar, Filter, Users, TrendingUp } from "lucide-react";
import { EventType } from "@/lib/mockData";

export default function EventsPage() {
  const { events, loading, error } = useEvents();
  const [rsvps, setRsvps] = useState<Record<string, boolean>>({});
  const [filterType, setFilterType] = useState<EventType | 'all'>('all');
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const filteredEvents = events.filter(event => {
    if (filterType === 'all') return true;
    return event.type === filterType;
  });

  const handleToggleExpand = (eventId: string) => {
    setExpandedEventId(expandedEventId === eventId ? null : eventId);
  };

  // Calculate statistics
  const totalEvents = events.length;
  const gatheringEvents = events.filter(e => e.type === 'gathering').length;
  const guidanceEvents = events.filter(e => e.type === 'guidance').length;
  const myRsvpCount = Object.values(rsvps).filter(Boolean).length;

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading events...</p>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Upcoming Events</h1>
            <p className="text-gray-600">
              Discover and join exciting events in our alumni community. Connect, learn, and grow together.
            </p>
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <p className="font-medium">Error loading events:</p>
                <p>{error}</p>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Events</p>
                  <p className="text-3xl font-bold text-gray-900">{totalEvents}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Alumni Gatherings</p>
                  <p className="text-3xl font-bold text-gray-900">{gatheringEvents}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Guidance Sessions</p>
                  <p className="text-3xl font-bold text-gray-900">{guidanceEvents}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">My RSVPs</p>
                  <p className="text-3xl font-bold text-gray-900">{myRsvpCount}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Event Filter */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-4">
              <Filter className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-gray-900">Filter Events:</span>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as EventType | 'all')}
              >
                <option value="all">All Events ({events.length})</option>
                <option value="gathering">
                  Alumni Gatherings ({gatheringEvents})
                </option>
                <option value="guidance">
                  Guidance Sessions ({guidanceEvents})
                </option>
              </select>
              <div className="ml-auto text-sm text-gray-600">
                Showing {filteredEvents.length} of {totalEvents} events
              </div>
            </div>
          </div>

          {/* Events List */}
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {filterType === 'all' ? 'No Events Available' : `No ${filterType === 'gathering' ? 'Gathering' : 'Guidance'} Events`}
              </h3>
              <p className="text-gray-600">
                {filterType === 'all' 
                  ? 'Check back later for upcoming events.' 
                  : 'Try changing the filter to see other types of events.'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredEvents.map(event => (
                <div key={event.id} className="relative">
                  <StudentEventCard 
                    event={event} 
                    isExpanded={expandedEventId === event.id}
                    onToggleExpand={() => handleToggleExpand(event.id)}
                  />
                  
                  {/* RSVP Button Overlay */}
                  <div className="absolute top-4 right-16">
                    <button
                      onClick={() => setRsvps(prev => ({ ...prev, [event.id]: !rsvps[event.id] }))}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        rsvps[event.id] 
                          ? "bg-red-100 text-red-700 hover:bg-red-200" 
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {rsvps[event.id] ? "Cancel RSVP" : "RSVP"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}