"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function BroadcastsPage() {
  const [seg, setSeg] = useState({ yearFrom: 2019, yearTo: 2024, branch: "All" });
  const [msg, setMsg] = useState("Hello alumni! Join our upcoming meet on 10 Oct.");
  const [sent, setSent] = useState(false);

  return (
    <>
      <Navbar />
      <main className="section py-10">
        <h1 className="text-2xl font-bold mb-4">Broadcasts</h1>
        <div className="card">
          <div className="grid sm:grid-cols-3 gap-2 mb-2">
            <input className="input" type="number" value={seg.yearFrom} onChange={e => setSeg({ ...seg, yearFrom: Number(e.target.value) })} placeholder="From year" />
            <input className="input" type="number" value={seg.yearTo} onChange={e => setSeg({ ...seg, yearTo: Number(e.target.value) })} placeholder="To year" />
            <select className="input" value={seg.branch} onChange={e => setSeg({ ...seg, branch: e.target.value })}>
              <option>All</option><option>CSE</option><option>ECE</option><option>IT</option>
            </select>
          </div>
          <textarea className="input h-24" value={msg} onChange={e => setMsg(e.target.value)} />
          <button className="btn-primary mt-2" onClick={() => setSent(true)}>Send Broadcast</button>
          {sent && <div className="mt-2 text-green-600">Broadcast sent to 1,254 recipients (demo).</div>}
        </div>
      </main>
    </>
  );
}