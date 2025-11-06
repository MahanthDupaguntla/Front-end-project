"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MOCK_REGISTRATIONS, MOCK_EVENTS } from "@/lib/mock-data";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";

export default function AdminRegistrationsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [filter, setFilter] = useState("all");

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

  const filteredRegistrations = MOCK_REGISTRATIONS.filter(reg =>
    filter === "all" || reg.status === filter
  );

  const handleApprove = (id) => {
    toast.success("Registration approved successfully");
  };

  const handleReject = (id) => {
    toast.error("Registration rejected");
  };

  const pendingCount = MOCK_REGISTRATIONS.filter(r => r.status === "pending").length;
  const approvedCount = MOCK_REGISTRATIONS.filter(r => r.status === "approved").length;
  const waitlistCount = MOCK_REGISTRATIONS.filter(r => r.status === "waitlist").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Registration Management</h1>
          <p className="text-gray-600 mt-1">Approve and manage student registrations</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{MOCK_REGISTRATIONS.length}</div>
              <div className="text-sm text-gray-600">Total Registrations</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:border-orange-300" onClick={() => setFilter("pending")}>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
              <div className="text-sm text-gray-600">Pending Approval</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:border-green-300" onClick={() => setFilter("approved")}>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
              <div className="text-sm text-gray-600">Approved</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:border-blue-300" onClick={() => setFilter("waitlist")}>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">{waitlistCount}</div>
              <div className="text-sm text-gray-600">Waitlisted</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Buttons */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-2 flex-wrap">
              <Button 
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button 
                variant={filter === "pending" ? "default" : "outline"}
                onClick={() => setFilter("pending")}
              >
                Pending
              </Button>
              <Button 
                variant={filter === "approved" ? "default" : "outline"}
                onClick={() => setFilter("approved")}
              >
                Approved
              </Button>
              <Button 
                variant={filter === "waitlist" ? "default" : "outline"}
                onClick={() => setFilter("waitlist")}
              >
                Waitlist
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Registrations Table */}
        <Card>
          <CardHeader>
            <CardTitle>Registrations ({filteredRegistrations.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Registered Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegistrations.map((reg) => {
                  const event = MOCK_EVENTS.find(e => e.id === reg.eventId);
                  return (
                    <TableRow key={reg.id}>
                      <TableCell>
                        <div className="font-medium">{reg.studentName}</div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{event?.title}</div>
                          <div className="text-sm text-gray-500">{event?.date}</div>
                        </div>
                      </TableCell>
                      <TableCell>{reg.registeredAt}</TableCell>
                      <TableCell>
                        <Badge variant={
                          reg.status === "approved" ? "default" :
                          reg.status === "pending" ? "secondary" :
                          reg.status === "waitlist" ? "outline" :
                          "destructive"
                        }>
                          {reg.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {reg.status === "pending" && (
                          <div className="flex gap-2 justify-end">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleApprove(reg.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                              Approve
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleReject(reg.id)}
                            >
                              <XCircle className="h-4 w-4 mr-1 text-red-600" />
                              Reject
                            </Button>
                          </div>
                        )}
                        {reg.status === "approved" && (
                          <Badge variant="default">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Confirmed
                          </Badge>
                        )}
                        {reg.status === "waitlist" && (
                          <Button variant="outline" size="sm">
                            <Clock className="h-4 w-4 mr-1" />
                            Promote
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {filteredRegistrations.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No registrations found
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
