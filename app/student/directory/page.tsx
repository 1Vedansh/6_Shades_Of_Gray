import Navbar from "@/components/Navbar";
import { mockAlumni } from "@/lib/mockData";

export default function DirectoryPage() {
  return (
    <>
      <Navbar />
      <main className="section py-10">
        <h1 className="text-2xl font-bold mb-4">Alumni Directory</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {mockAlumni.map(a => (
            <div key={a.id} className="card">
              <div className="font-semibold">{a.name} ({a.gradYear})</div>
              <div className="text-sm text-brand-700">{a.role} at {a.company}</div>
              <div className="mt-2 text-brand-900">Branch: {a.branch} | Location: {a.location}</div>
              <div className="mt-2">{a.skills.join(", ")}</div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}