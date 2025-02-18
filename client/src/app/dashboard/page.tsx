"use client";

import { Suspense } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { PlusCircle, Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import TimeBalance from "@/components/TimeBalance";
import RecentTransactions from "@/components/RecentTransactions";
import AvailableServices from "@/components/AvailableServices";
import UpcomingAppointments from "@/components/UpcomingAppointments";
import CommunityActivity from "@/components/CommunityActivity";

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">TimeBank</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search services..."
                className="w-64 pl-9"
              />
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Welcome back, {user?.firstName}!</CardTitle>
                <CardDescription>
                  Here is what is happening with your TimeBank account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-start mb-6">
                  <TimeBalance />
                  <div className="space-x-2">
                    <Button asChild>
                      <Link href="/services/offer-service">
                        <PlusCircle className="mr-2 h-4 w-4" /> Offer Service
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/services">
                        <Search className="mr-2 h-4 w-4" /> Find Service
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="space-y-6">
                  <Suspense fallback={<div>Loading transactions...</div>}>
                    <RecentTransactions />
                  </Suspense>
                  <Suspense fallback={<div>Loading services...</div>}>
                    <AvailableServices />
                  </Suspense>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading appointments...</div>}>
                  <UpcomingAppointments />
                </Suspense>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading community activity...</div>}>
                  <CommunityActivity />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          © 2024 TimeBank. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
