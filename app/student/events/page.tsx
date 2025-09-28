"use client";
import Navbar from "@/components/Navbar";
import { mockEvents } from "@/lib/mockData";
import { useState } from "react";

export default function EventsPage() {
  const [rsvps, setRsvps] = useState<Record<string, boolean>>({});
  return (
    <>
      <Navbar />
      <main className="section py-10">
        <h1 className="text-2xl font-bold mb-4">Events</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {mockEvents.map(ev => {
            const going = rsvps[ev.id];
            return (
              <div key={ev.id} className="card">
                <div className="font-semibold">{ev.title}</div>
                <div className="text-sm text-brand-700">{ev.date} • {ev.venue}</div>
                <div className="mt-2">Capacity: {ev.capacity}, RSVP: {ev.rsvp}</div>
                <button
                  onClick={() => setRsvps(prev => ({ ...prev, [ev.id]: !going }))}
                  className={going ? "btn-ghost mt-3" : "btn-primary mt-3"}
                >
                  {going ? "Cancel RSVP" : "RSVP"}
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}