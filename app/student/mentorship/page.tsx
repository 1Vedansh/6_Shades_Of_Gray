"use client";
import Navbar from "@/components/Navbar";
import { mockMentorSlots } from "@/lib/mockData";
import { useState } from "react";

export default function MentorshipPage() {
  const [booked, setBooked] = useState<Record<string, boolean>>({});
  return (
    <>
      <Navbar />
      <main className="section py-10">
        <h1 className="text-2xl font-bold mb-4">Mentorship</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {mockMentorSlots.map(s => {
            const isBooked = booked[s.id];
            return (
              <div key={s.id} className="card">
                <div className="font-semibold">{s.mentor}</div>
                <div className="text-sm text-brand-700">{s.date} • {s.from}–{s.to}</div>
                <div className="mt-2">Slots: {s.booked}/{s.capacity}</div>
                <button onClick={() => setBooked(prev => ({ ...prev, [s.id]: !isBooked }))} className={isBooked ? "btn-ghost mt-3" : "btn-primary mt-3"}>
                  {isBooked ? "Cancel Booking" : "Book Slot"}
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}