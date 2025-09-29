export const mockBlogPosts = [
  {
    id: "bp1",
    author: "Alice Patel",
    title: "How Alumni Mentorship Boosts Careers",
    date: "2025-09-21",
    body: "Mentorship helped me grow faster than any course. Reach out to alumni for guidance!"
  },
  {
    id: "bp2",
    author: "Sara Khan",
    title: "Tips for Getting Internships via Alumni Network",
    date: "2025-09-14",
    body: "Use the alumni directory to find people at your dream company. Send a polite message!"
  },
  {
    id: "bp3",
    author: "Rahul Mehta",
    title: "Industry Trends 2025",
    date: "2025-09-10",
    body: "AI, IoT, and Embedded systems are booming. Keep learning and networking!"
  }
];

export const mockAlumni = [
  { id: "al_1", name: "Alice Patel", gradYear: 2021, branch: "CSE", company: "Acme", role: "SWE", location: "Bengaluru", skills: ["React", "Postgres"], linkedin: "#" },
  { id: "al_2", name: "Rahul Mehta", gradYear: 2019, branch: "ECE", company: "Globex", role: "Hardware Eng", location: "Pune", skills: ["Embedded", "C", "IoT"], linkedin: "#" },
  { id: "al_3", name: "Sara Khan", gradYear: 2020, branch: "IT", company: "Innotech", role: "Data Scientist", location: "Hyderabad", skills: ["Python", "NLP"], linkedin: "#" }
];

export const mockEvents = [
  { 
    id: "ev_1", 
    title: "Alumni Meet 2025", 
    type: "gathering" as const,
    date: "2025-10-10", 
    venue: "Main Auditorium", 
    capacity: 300, 
    rsvp: 125,
    description: "Join us for our annual alumni gathering where we celebrate achievements, network, and reconnect with old friends. Experience inspiring talks, delicious food, and memorable moments.",
    alumniList: [],
    dateTime: "2025-09-30T12:00:00.000Z",
    fromYear: null,
    toYear: null
  },
  { 
    id: "ev_2", 
    title: "Data Science Career Guidance Session", 
    type: "guidance" as const,
    date: "2025-11-05", 
    venue: "Online", 
    capacity: 50, 
    rsvp: 32,
    description: "Get personalized career guidance from industry experts in data science. Learn about current trends, skill requirements, and career paths in this rapidly evolving field.",
    alumniList: ["Sara Khan", "Alice Patel"],
    dateTime: "2025-09-30T12:00:00.000Z",
    fromYear: null,
    toYear: null
  },
  {
    id: "ev_3",
    title: "Tech Industry Networking Event",
    type: "gathering" as const,
    date: "2025-12-15",
    venue: "Tech Hub, Bangalore",
    capacity: 150,
    rsvp: 89,
    description: "Connect with fellow alumni working in the technology sector. Share experiences, explore collaboration opportunities, and expand your professional network.",
    alumniList: [],
    dateTime: "2025-09-30T12:00:00.000Z",
    fromYear: null,
    toYear: null
  }
];

export type EventType = "gathering" | "guidance";

export interface Event {
  id: string;
  title: string;
  type: EventType;
  date: string;
  venue: string;
  capacity: number;
  rsvp: number;
  description: string;
  alumniList: string[];
  dateTime: string;
  fromYear?: number | null;
  toYear?: number | null;
}

export const mockMentorSlots = [
  { id: "ms_1", mentor: "Alice Patel", date: "2025-10-02", from: "16:00", to: "17:00", capacity: 3, booked: 2 },
  { id: "ms_2", mentor: "Sara Khan", date: "2025-10-03", from: "15:00", to: "16:00", capacity: 5, booked: 1 }
];