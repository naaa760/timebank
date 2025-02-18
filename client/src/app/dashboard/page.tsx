import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import DashboardCard from "@/components/DashboardCard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            TimeBank Dashboard
          </h1>
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard title="Time Balance">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">120</p>
              <p className="text-sm text-gray-600">Hours Available</p>
            </div>
          </DashboardCard>

          <DashboardCard title="Services Offered">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">8</p>
              <p className="text-sm text-gray-600">Active Listings</p>
            </div>
          </DashboardCard>

          <DashboardCard title="Services Received">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">5</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </DashboardCard>
        </div>

        {/* Quick Actions and Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="space-y-6">
            <DashboardCard title="Quick Actions">
              <div className="space-y-3">
                <Link
                  href="/services/offer"
                  className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  Offer a Service
                </Link>
                <Link
                  href="/services/request"
                  className="block w-full text-center bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                >
                  Request a Service
                </Link>
                <Link
                  href="/community"
                  className="block w-full text-center bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
                >
                  Join Community
                </Link>
              </div>
            </DashboardCard>

            <DashboardCard title="My Services">
              <div className="space-y-3">
                {/* Placeholder for services list */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">Web Development</p>
                  <p className="text-sm text-gray-600">2 hours/session</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">Language Teaching</p>
                  <p className="text-sm text-gray-600">1 hour/session</p>
                </div>
              </div>
            </DashboardCard>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <DashboardCard title="Recent Activity">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Service Completed</p>
                    <p className="text-sm text-gray-600">
                      Web Development with John Doe
                    </p>
                    <p className="text-xs text-gray-500">
                      2 hours • 2 days ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">New Service Request</p>
                    <p className="text-sm text-gray-600">
                      Language Teaching from Jane Smith
                    </p>
                    <p className="text-xs text-gray-500">1 hour • 3 days ago</p>
                  </div>
                </div>
              </div>
            </DashboardCard>

            <DashboardCard title="Upcoming Sessions">
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">Web Development Session</p>
                  <p className="text-sm text-gray-600">with John Doe</p>
                  <p className="text-xs text-gray-500">Tomorrow at 2:00 PM</p>
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>
      </main>
    </div>
  );
}
