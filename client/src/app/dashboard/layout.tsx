import { Navbar } from "@/components/dashboard/Navbar";
import { DashboardProvider } from "@/contexts/DashboardContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <div
        className="min-h-screen relative"
        style={{
          backgroundImage: 'url("/da.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-white/90" />{" "}
        {/* White overlay for readability */}
        <div className="relative z-10">
          <Navbar />
          <main className="pt-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}
