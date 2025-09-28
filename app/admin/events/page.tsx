"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { mockEvents } from "@/lib/mockData";

export default function AdminEventsPage() {
  const [events, setEvents] = useState(mockEvents);
  const [form, setForm] = useState({ title: "", date: "", venue: "", capacity: 100 });

  function addEvent() {
    if (!form.title || !form.date || !form.venue) return;
    setEvents(prev => [...prev, { id: `ev_${prev.length+1}`, rsvp: 0, ...form } as any]);
    setForm({ title: "", date: "", venue: "", capacity: 100 });
  }

  return (
    <>
      <Navbar />
      <main className="section py-10">
        <h1 className="text-2xl font-bold mb-4">Manage Events</h1>
        <div className="card mb-6">
          <input className="input" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <div className="grid grid-cols-2 gap-2 mt-2">
            <input className="input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            <input className="input" placeholder="Venue/Link" value={form.venue} onChange={e => setForm({ ...form, venue: e.target.value })} />
          </div>
          <input className="input mt-2" type="number" placeholder="Capacity" value={form.capacity} onChange={e => setForm({ ...form, capacity: Number(e.target.value) })} />
          <button className="btn-primary mt-3" onClick={addEvent}>Add Event</button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {events.map(ev => (
            <div key={ev.id} className="card">
              <div className="font-semibold">{ev.title}</div>
              <div className="text-sm text-brand-700">{ev.date} • {ev.venue}</div>
              <div className="mt-2">Capacity: {ev.capacity}, RSVP: {ev.rsvp}</div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}