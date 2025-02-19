"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  Settings,
  HelpCircle,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Community",
    href: "/community",
    icon: Users,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    href: "/support",
    icon: HelpCircle,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "fixed left-4 top-4 h-[calc(100vh-2rem)] bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl transition-all duration-300 shadow-lg",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <Menu className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-full text-muted-foreground hover:bg-muted transition-colors",
                      pathname === link.href && "bg-primary/10 text-primary",
                      collapsed && "justify-center"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {!collapsed && <span>{link.title}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Time Balance Display */}
        <div
          className={cn(
            "p-4 border-t bg-muted/50",
            collapsed ? "text-center" : "space-y-1"
          )}
        >
          {!collapsed && (
            <p className="text-sm text-muted-foreground">Balance</p>
          )}
          <p className="font-medium text-primary">25.5h</p>
        </div>
      </div>
    </div>
  );
}
