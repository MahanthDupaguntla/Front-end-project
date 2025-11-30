'use client';

import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Welcome, {user?.name || 'User'}!</CardTitle>
          <CardDescription>
            You are logged in as {user?.email} ({user?.role} account)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>This is your dashboard. You can add your content here.</p>
            <Button onClick={logout} variant="outline">
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
