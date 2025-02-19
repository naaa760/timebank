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
    <div
      className="flex flex-col min-h-screen rounded-[80px] overflow-hidden"
      style={{
        backgroundImage: 'url("/da.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-lime-500/10 animate-gradient-xy" />

      <main className="relative flex-grow container mx-auto px-4 py-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            <Card className="bg-white/40 backdrop-blur-md border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-lime-500/10 rounded-t-xl">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-lime-600 bg-clip-text text-transparent">
                  Welcome back, {user?.firstName}!
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Here is what is happening with your TimeBank account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-start mb-6">
                  <TimeBalance />
                  <div className="space-x-2">
                    <Button
                      asChild
                      className="bg-gradient-to-r from-purple-500 to-lime-500 hover:from-purple-600 hover:to-lime-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Link href="/services/offer-service">
                        <PlusCircle className="mr-2 h-4 w-4" /> Offer Service
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="border-white/20 bg-white/50 hover:bg-white/60 backdrop-blur-sm transition-all duration-300"
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
            <Card className="bg-white/40 backdrop-blur-md border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-lime-500/10 to-purple-500/10 rounded-t-xl">
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-lime-600 to-purple-600 bg-clip-text text-transparent">
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-32 w-full" />}>
                  <UpcomingAppointments />
                </Suspense>
              </CardContent>
            </Card>

            <Card className="bg-white/40 backdrop-blur-md border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-lime-500/10 rounded-t-xl">
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-lime-600 bg-clip-text text-transparent">
                  Community Activity
                </CardTitle>
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

      <footer className="relative z-10 border-t border-white/20 bg-white/30 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600">
          © 2025 TimeBank. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
