import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Award, Bell, BarChart, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                CP
              </div>
              <span className="font-semibold text-lg">CampusPulse</span>
            </div>
            <nav className="flex items-center gap-2">
              <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/login">Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-20 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              🎓 For Educational Institutions
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Organize Student Activities
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Effortlessly</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A centralized platform for managing extracurricular activities, events, registrations, and student achievements. 
              Built for administrators and students.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button asChild size="lg" variant="outline">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Everything You Need</h2>
            <p className="text-gray-600">Powerful features for both administrators and students</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Calendar className="h-6 w-6" />}
              title="Smart Scheduling"
              description="Create events with automatic conflict detection for venues, times, and organizers."
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Easy Registration"
              description="Students can browse, register, and join waitlists with instant notifications."
            />
            <FeatureCard
              icon={<CheckCircle className="h-6 w-6" />}
              title="Quick Attendance"
              description="QR code check-in system for fast and accurate attendance tracking."
            />
            <FeatureCard
              icon={<Award className="h-6 w-6" />}
              title="Auto Certificates"
              description="Generate and distribute certificates automatically for completed activities."
            />
            <FeatureCard
              icon={<Bell className="h-6 w-6" />}
              title="Real-time Notifications"
              description="Keep everyone informed with instant updates and reminders."
            />
            <FeatureCard
              icon={<BarChart className="h-6 w-6" />}
              title="Analytics & Reports"
              description="Comprehensive insights on participation, engagement, and achievements."
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Join hundreds of institutions using CampusPulse to manage their extracurricular programs.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/login">Login Now</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} CampusPulse. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="border-2 hover:border-blue-300 transition-colors">
      <CardHeader>
        <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
