// Mock data for immediate demo - in production, this would be from a database

export const MOCK_CLUBS = [
  { id: "1", name: "Tech Innovators", category: "Technology", description: "Coding, AI, and tech projects", members: 45 },
  { id: "2", name: "Drama Society", category: "Arts", description: "Theater and performing arts", members: 32 },
  { id: "3", name: "Sports Club", category: "Sports", description: "Various sports activities", members: 67 },
  { id: "4", name: "Music Ensemble", category: "Arts", description: "Orchestra and band", members: 28 },
  { id: "5", name: "Debate Team", category: "Academic", description: "Competitive debating", members: 24 },
];

export const MOCK_EVENTS = [
  {
    id: "1",
    title: "Annual Tech Hackathon",
    club: "Tech Innovators",
    category: "Technology",
    date: "2025-11-15",
    time: "09:00 AM",
    venue: "Computer Lab A",
    capacity: 50,
    registered: 35,
    status: "upcoming",
    description: "24-hour coding competition with amazing prizes",
    organizer: "Dr. Sarah Johnson",
  },
  {
    id: "2",
    title: "Spring Musical Performance",
    club: "Drama Society",
    category: "Arts",
    date: "2025-11-20",
    time: "06:00 PM",
    venue: "Main Auditorium",
    capacity: 200,
    registered: 180,
    status: "upcoming",
    description: "Annual spring musical showcase",
    organizer: "Prof. Maria Garcia",
  },
  {
    id: "3",
    title: "Basketball Tournament Finals",
    club: "Sports Club",
    category: "Sports",
    date: "2025-11-12",
    time: "04:00 PM",
    venue: "Sports Complex",
    capacity: 100,
    registered: 89,
    status: "upcoming",
    description: "Championship match for inter-college tournament",
    organizer: "Coach Mike Williams",
  },
  {
    id: "4",
    title: "Workshop: React Advanced Patterns",
    club: "Tech Innovators",
    category: "Technology",
    date: "2025-11-08",
    time: "02:00 PM",
    venue: "Seminar Hall",
    capacity: 40,
    registered: 40,
    status: "full",
    description: "Advanced React hooks and patterns",
    organizer: "Dr. Sarah Johnson",
  },
  {
    id: "5",
    title: "Debate Championship",
    club: "Debate Team",
    category: "Academic",
    date: "2025-11-25",
    time: "10:00 AM",
    venue: "Conference Room",
    capacity: 30,
    registered: 18,
    status: "upcoming",
    description: "Inter-college debate competition",
    organizer: "Prof. James Chen",
  },
];

export const MOCK_REGISTRATIONS = [
  { id: "1", eventId: "1", studentId: "2", studentName: "Alex Morgan", status: "approved", registeredAt: "2025-10-28" },
  { id: "2", eventId: "2", studentId: "2", studentName: "Alex Morgan", status: "approved", registeredAt: "2025-10-25" },
  { id: "3", eventId: "3", studentId: "3", studentName: "Emma Davis", status: "pending", registeredAt: "2025-11-01" },
  { id: "4", eventId: "4", studentId: "2", studentName: "Alex Morgan", status: "waitlist", registeredAt: "2025-11-02" },
];

export const MOCK_ACHIEVEMENTS = [
  { id: "1", title: "Hackathon Winner 2024", event: "Annual Tech Hackathon", date: "2024-11-15", certificate: true },
  { id: "2", title: "Best Actor Award", event: "Spring Musical", date: "2024-05-20", certificate: true },
  { id: "3", title: "Participation Certificate", event: "Basketball Tournament", date: "2024-10-12", certificate: true },
];

export const MOCK_NOTIFICATIONS = [
  { id: "1", type: "reminder", title: "Event Tomorrow", message: "Tech Hackathon starts tomorrow at 9 AM", time: "2 hours ago", read: false },
  { id: "2", type: "approved", title: "Registration Approved", message: "Your registration for Spring Musical has been approved", time: "1 day ago", read: false },
  { id: "3", type: "update", title: "Venue Changed", message: "Basketball Finals venue updated to Sports Complex", time: "3 days ago", read: true },
];
