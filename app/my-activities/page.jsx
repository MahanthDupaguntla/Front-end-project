"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_EVENTS, MOCK_REGISTRATIONS, MOCK_ACHIEVEMENTS } from "@/lib/mock-data";
import { Calendar, Download, Award, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

export default function MyActivitiesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
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

  const handleDownloadCertificate = (achievementId) => {
    toast.success("Certificate downloaded successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Activities</h1>
          <p className="text-gray-600 mt-1">Track your participation and achievements</p>
        </div>

        <Tabs defaultValue="registrations" className="space-y-6">
          <TabsList>
            <TabsTrigger value="registrations">My Registrations</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Registrations Tab */}
          <TabsContent value="registrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Registered Events</CardTitle>
                <CardDescription>Events you're currently registered for</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myRegistrations.map((reg) => {
                    const event = MOCK_EVENTS.find(e => e.id === reg.eventId);
                    return (
                      <div key={reg.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{event?.title}</h3>
                            <p className="text-sm text-gray-600">{event?.club}</p>
                          </div>
                          <Badge variant={
                            reg.status === "approved" ? "default" :
                            reg.status === "waitlist" ? "secondary" :
                            reg.status === "pending" ? "outline" :
                            "destructive"
                          }>
                            {reg.status}
                          </Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {event?.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {event?.time}
                          </div>
                          <div className="text-sm">
                            Registered: {reg.registeredAt}
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button variant="outline" size="sm">Add to Calendar</Button>
                          {reg.status === "approved" && (
                            <Button variant="outline" size="sm">Cancel Registration</Button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {myRegistrations.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      No registrations yet. Explore events to get started!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Achievements</CardTitle>
                <CardDescription>Certificates and awards you've earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {MOCK_ACHIEVEMENTS.map((achievement) => (
                    <div key={achievement.id} className="border rounded-lg p-4 bg-gradient-to-br from-purple-50 to-blue-50">
                      <div className="flex items-start gap-3">
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white">
                          <Award className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{achievement.event}</p>
                          <p className="text-xs text-gray-500 mt-1">Awarded: {achievement.date}</p>
                          
                          {achievement.certificate && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-3"
                              onClick={() => handleDownloadCertificate(achievement.id)}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download Certificate
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {MOCK_ACHIEVEMENTS.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    No achievements yet. Complete events to earn certificates!
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Participation History</CardTitle>
                <CardDescription>All your past activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {MOCK_ACHIEVEMENTS.map((achievement) => (
                    <div key={achievement.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium">{achievement.event}</div>
                          <div className="text-sm text-gray-600">{achievement.date}</div>
                        </div>
                      </div>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
