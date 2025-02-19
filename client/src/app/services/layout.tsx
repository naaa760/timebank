import { DashboardProvider } from "@/contexts/DashboardContext";

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardProvider>{children}</DashboardProvider>;
}
