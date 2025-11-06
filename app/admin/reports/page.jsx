"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MOCK_EVENTS, MOCK_REGISTRATIONS, MOCK_CLUBS } from "@/lib/mock-data";
import { Download, TrendingUp, Users, Calendar, Award } from "lucide-react";
import { toast } from "sonner";

export default function AdminReportsPage() {
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

  const handleExport = (type) => {
    toast.success(`${type} report exported successfully`);
  };

  const totalEvents = MOCK_EVENTS.length;
  const totalRegistrations = MOCK_REGISTRATIONS.length;
  const avgAttendance = 78;
  const totalClubs = MOCK_CLUBS.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Generate and export comprehensive reports</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Total Events</div>
                  <div className="text-2xl font-bold mt-1">{totalEvents}</div>
                </div>
                <Calendar className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Registrations</div>
                  <div className="text-2xl font-bold mt-1">{totalRegistrations}</div>
                </div>
                <Users className="h-10 w-10 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Avg Attendance</div>
                  <div className="text-2xl font-bold mt-1">{avgAttendance}%</div>
                </div>
                <TrendingUp className="h-10 w-10 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Active Clubs</div>
                  <div className="text-2xl font-bold mt-1">{totalClubs}</div>
                </div>
                <Award className="h-10 w-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Export Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Export Reports</CardTitle>
              <CardDescription>Download detailed reports in various formats</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <ReportCard
                title="Event Participation Report"
                description="Detailed breakdown of attendance and participation"
                onExport={() => handleExport("Participation")}
              />
              <ReportCard
                title="Club Performance Report"
                description="Analytics on club activities and engagement"
                onExport={() => handleExport("Club Performance")}
              />
              <ReportCard
                title="Registration Summary"
                description="Overview of all registrations and statuses"
                onExport={() => handleExport("Registration")}
              />
              <ReportCard
                title="Achievement Report"
                description="Student achievements and certificates issued"
                onExport={() => handleExport("Achievement")}
              />
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Clubs</CardTitle>
              <CardDescription>Based on attendance and engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_CLUBS.map((club, idx) => (
                  <div key={club.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-medium">{club.name}</div>
                        <div className="text-sm text-gray-600">{club.category}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{club.members}</div>
                      <div className="text-sm text-gray-600">members</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Engagement Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Engagement Trends</CardTitle>
              <CardDescription>Weekly participation overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <TrendItem week="Week 1" participation={85} />
                <TrendItem week="Week 2" participation={92} />
                <TrendItem week="Week 3" participation={78} />
                <TrendItem week="Week 4" participation={88} />
              </div>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Event Categories</CardTitle>
              <CardDescription>Distribution by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <CategoryBar category="Technology" count={8} total={totalEvents} color="bg-blue-500" />
                <CategoryBar category="Arts" count={6} total={totalEvents} color="bg-purple-500" />
                <CategoryBar category="Sports" count={4} total={totalEvents} color="bg-green-500" />
                <CategoryBar category="Academic" count={3} total={totalEvents} color="bg-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function ReportCard({ title, description, onExport }) {
  return (
    <div className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="font-medium">{title}</div>
          <div className="text-sm text-gray-600 mt-1">{description}</div>
        </div>
        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="h-4 w-4 mr-1" />
          Export
        </Button>
      </div>
    </div>
  );
}

function TrendItem({ week, participation }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{week}</span>
        <span className="text-gray-600">{participation}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
          style={{ width: `${participation}%` }}
        />
      </div>
    </div>
  );
}

function CategoryBar({ category, count, total, color }) {
  const percentage = (count / total) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{category}</span>
        <span className="text-gray-600">{count} events</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`${color} h-2 rounded-full transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
