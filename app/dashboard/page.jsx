"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_EVENTS, MOCK_REGISTRATIONS, MOCK_ACHIEVEMENTS, MOCK_NOTIFICATIONS } from "@/lib/mock-data";
import { Calendar, Clock, MapPin, Users, Award, Bell, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user?.role === "admin") {
      router.push("/admin");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const myRegistrations = MOCK_REGISTRATIONS.filter(r => r.studentId === user.id);
  const upcomingEvents = MOCK_EVENTS.filter(e => e.status === "upcoming").slice(0, 3);
  const unreadNotifications = MOCK_NOTIFICATIONS.filter(n => !n.read);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your activities</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="My Registrations"
            value={myRegistrations.length}
            icon={<Calendar className="h-5 w-5" />}
            color="bg-blue-500"
          />
          <StatCard
            title="Upcoming Events"
            value={upcomingEvents.length}
            icon={<Clock className="h-5 w-5" />}
            color="bg-green-500"
          />
          <StatCard
            title="Achievements"
            value={MOCK_ACHIEVEMENTS.length}
            icon={<Award className="h-5 w-5" />}
            color="bg-purple-500"
          />
          <StatCard
            title="Notifications"
            value={unreadNotifications.length}
            icon={<Bell className="h-5 w-5" />}
            color="bg-orange-500"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Upcoming Events</CardTitle>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/events">View All</Link>
                  </Button>
                </div>
                <CardDescription>Don't miss these exciting activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </CardContent>
            </Card>

            {/* My Registrations */}
            <Card>
              <CardHeader>
                <CardTitle>My Registrations</CardTitle>
                <CardDescription>Events you're registered for</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {myRegistrations.map((reg) => {
                    const event = MOCK_EVENTS.find(e => e.id === reg.eventId);
                    return (
                      <div key={reg.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{event?.title}</div>
                          <div className="text-sm text-gray-600">{event?.date} • {event?.time}</div>
                        </div>
                        <Badge variant={reg.status === "approved" ? "default" : reg.status === "waitlist" ? "secondary" : "outline"}>
                          {reg.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {MOCK_NOTIFICATIONS.slice(0, 3).map((notif) => (
                  <div key={notif.id} className="pb-3 border-b last:border-0">
                    <div className="flex items-start gap-2">
                      <div className={`mt-1 h-2 w-2 rounded-full ${notif.read ? 'bg-gray-300' : 'bg-blue-500'}`} />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{notif.title}</div>
                        <div className="text-xs text-gray-600 mt-1">{notif.message}</div>
                        <div className="text-xs text-gray-400 mt-1">{notif.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">My Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {MOCK_ACHIEVEMENTS.map((achievement) => (
                  <div key={achievement.id} className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Award className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{achievement.title}</div>
                      <div className="text-xs text-gray-600">{achievement.event}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-600">{title}</div>
            <div className="text-2xl font-bold mt-1">{value}</div>
          </div>
          <div className={`${color} p-3 rounded-lg text-white`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EventCard({ event }) {
  return (
    <div className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold">{event.title}</h3>
          <p className="text-sm text-gray-600">{event.club}</p>
        </div>
        <Badge>{event.category}</Badge>
      </div>
      <div className="space-y-2 mt-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          {event.date} • {event.time}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          {event.venue}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          {event.registered}/{event.capacity} registered
        </div>
      </div>
      <Button className="w-full mt-4" size="sm">
        {event.status === "full" ? "Join Waitlist" : "Register Now"}
      </Button>
    </div>
  );
}
