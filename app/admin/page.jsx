"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MOCK_EVENTS, MOCK_REGISTRATIONS, MOCK_CLUBS } from "@/lib/mock-data";
import { Calendar, Users, Award, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user?.role !== "admin") {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const totalEvents = MOCK_EVENTS.length;
  const upcomingEvents = MOCK_EVENTS.filter(e => e.status === "upcoming").length;
  const totalRegistrations = MOCK_REGISTRATIONS.length;
  const pendingApprovals = MOCK_REGISTRATIONS.filter(r => r.status === "pending").length;
  const totalClubs = MOCK_CLUBS.length;
  const avgAttendance = 78;

  const recentEvents = MOCK_EVENTS.slice(0, 5);
  const recentRegistrations = MOCK_REGISTRATIONS.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage all extracurricular activities and events</p>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <Button asChild>
            <Link href="/admin/events/new">+ Create Event</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/registrations">Manage Registrations</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/reports">View Reports</Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Events"
            value={totalEvents}
            subtitle={`${upcomingEvents} upcoming`}
            icon={<Calendar className="h-5 w-5" />}
            color="bg-blue-500"
            trend="+12%"
          />
          <StatCard
            title="Total Registrations"
            value={totalRegistrations}
            subtitle={`${pendingApprovals} pending`}
            icon={<Users className="h-5 w-5" />}
            color="bg-green-500"
            trend="+8%"
          />
          <StatCard
            title="Active Clubs"
            value={totalClubs}
            subtitle="All categories"
            icon={<Award className="h-5 w-5" />}
            color="bg-purple-500"
          />
          <StatCard
            title="Avg Attendance"
            value={`${avgAttendance}%`}
            subtitle="Last 30 days"
            icon={<TrendingUp className="h-5 w-5" />}
            color="bg-orange-500"
            trend="+5%"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Events */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Events</CardTitle>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/admin/events">Manage All</Link>
                  </Button>
                </div>
                <CardDescription>Overview of all events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {event.date} • {event.venue}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {event.registered}/{event.capacity} registered
                        </div>
                      </div>
                      <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>
                        {event.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Registrations */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Registrations</CardTitle>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/admin/registrations">View All</Link>
                  </Button>
                </div>
                <CardDescription>Approve or manage student registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentRegistrations.map((reg) => {
                    const event = MOCK_EVENTS.find(e => e.id === reg.eventId);
                    return (
                      <div key={reg.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{reg.studentName}</div>
                          <div className="text-sm text-gray-600">{event?.title}</div>
                          <div className="text-xs text-gray-500 mt-1">Registered: {reg.registeredAt}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={
                            reg.status === "approved" ? "default" :
                            reg.status === "pending" ? "secondary" :
                            "outline"
                          }>
                            {reg.status}
                          </Badge>
                          {reg.status === "pending" && (
                            <Button size="sm" variant="outline">Approve</Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">System Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <AlertItem
                  type="warning"
                  title="Pending Approvals"
                  message={`${pendingApprovals} registrations awaiting approval`}
                />
                <AlertItem
                  type="info"
                  title="Upcoming Events"
                  message={`${upcomingEvents} events scheduled this week`}
                />
                <AlertItem
                  type="success"
                  title="High Engagement"
                  message="Sports Club has 89% attendance rate"
                />
              </CardContent>
            </Card>

            {/* Top Clubs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Top Performing Clubs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {MOCK_CLUBS.slice(0, 5).map((club, idx) => (
                  <div key={club.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{club.name}</div>
                        <div className="text-xs text-gray-600">{club.members} members</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start" size="sm">
                  <Link href="/admin/attendance">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Record Attendance
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start" size="sm">
                  <Link href="/admin/announcements">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Send Announcement
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start" size="sm">
                  <Link href="/admin/certificates">
                    <Award className="mr-2 h-4 w-4" />
                    Generate Certificates
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon, color, trend }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <div className={`${color} p-3 rounded-lg text-white`}>
            {icon}
          </div>
          {trend && (
            <Badge variant="secondary" className="text-green-600">
              {trend}
            </Badge>
          )}
        </div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm font-medium text-gray-600 mt-1">{title}</div>
        <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
      </CardContent>
    </Card>
  );
}

function AlertItem({ type, title, message }) {
  const colors = {
    warning: "bg-orange-100 text-orange-700",
    info: "bg-blue-100 text-blue-700",
    success: "bg-green-100 text-green-700",
  };

  return (
    <div className={`p-3 rounded-lg ${colors[type]}`}>
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs mt-1 opacity-90">{message}</div>
    </div>
  );
}
