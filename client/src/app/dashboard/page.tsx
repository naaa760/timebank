"use client";

import { Suspense } from "react";
import { useUser } from "@clerk/nextjs";
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
import { Skeleton } from "@/components/ui/skeleton";
import TimeBalance from "@/components/TimeBalance";
import RecentTransactions from "@/components/RecentTransactions";
import AvailableServices from "@/components/AvailableServices";
import UpcomingAppointments from "@/components/UpcomingAppointments";
import CommunityActivity from "@/components/CommunityActivity";

function LoadingCard() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-32 w-full" />
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <LoadingCard />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            <Card className="bg-white/50 backdrop-blur-sm border-lime-500/20">
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
                    <Button asChild className="bg-lime-500 hover:bg-lime-600">
                      <Link href="/services/offer-service">
                        <PlusCircle className="mr-2 h-4 w-4" /> Offer Service
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="border-lime-500/20 hover:bg-lime-50"
                    >
                      <Link href="/services">
                        <Search className="mr-2 h-4 w-4" /> Find Service
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="space-y-6">
                  <Suspense fallback={<Skeleton className="h-32 w-full" />}>
                    <RecentTransactions />
                  </Suspense>
                  <Suspense fallback={<Skeleton className="h-32 w-full" />}>
                    <AvailableServices />
                  </Suspense>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white/50 backdrop-blur-sm border-lime-500/20">
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-32 w-full" />}>
                  <UpcomingAppointments />
                </Suspense>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur-sm border-lime-500/20">
              <CardHeader>
                <CardTitle>Community Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-32 w-full" />}>
                  <CommunityActivity />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="border-t border-lime-500/20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          © 2024 TimeBank. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
