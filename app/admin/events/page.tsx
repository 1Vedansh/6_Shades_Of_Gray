"use client";
import Navbar from "@/components/Navbar";
import EventForm from "@/components/EventForm";
import EventCard from "@/components/EventCard";
import { EventProvider, useEvents } from "@/context/EventContext";
import { Calendar, Users } from "lucide-react";

export default function AdminEventsPage() {
  const { events, loading, error } = useEvents();

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="section py-10">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-700 mx-auto mb-4"></div>
              <p className="text-brand-700">Loading events...</p>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="section py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-900 mb-2">Event Management</h1>
          <p className="text-brand-700">Create, manage, and organize alumni events and guidance sessions.</p>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <p className="font-medium">Error loading events:</p>
              <p>{error}</p>
            </div>
          )}
        </div>

        {/* Event Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-r from-brand-700 to-brand-900 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-brand-900">{events.length}</h3>
            <p className="text-brand-700">Total Events</p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-r from-brand-400 to-brand-700 flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-brand-900">
              {events.filter(e => e.type === 'gathering').length}
            </h3>
            <p className="text-brand-700">Alumni Gatherings</p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-brand-900">
              {events.filter(e => e.type === 'guidance').length}
            </h3>
            <p className="text-brand-700">Guidance Sessions</p>
          </div>
        </div>

        {/* Event Creation Form */}
        <EventForm />

        {/* Events List */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-brand-900 mb-4">
            All Events ({events.length})
          </h2>
          {events.length === 0 ? (
            <div className="card text-center py-12">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-brand-400" />
              <h3 className="text-xl font-semibold text-brand-900 mb-2">No Events Yet</h3>
              <p className="text-brand-700 mb-4">Create your first event to get started with event management.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  showDeleteButton={true}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}