"use client";

import { useDashboard } from "@/contexts/DashboardContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Star, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function AvailableServices() {
  const { state } = useDashboard();

  if (state.loading.services) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    );
  }

  if (state.error.services) {
    return <div className="text-red-500">{state.error.services}</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {state.services.slice(0, 6).map((service) => (
        <div
          key={service.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={service.provider.avatar} />
                  <AvatarFallback>
                    {service.provider.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    by {service.provider.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm ml-1">{service.provider.rating}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {service.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {service.hoursPerSession} hours/session
              </div>
              <Button asChild>
                <Link href={`/services/request-service?id=${service.id}`}>
                  Request
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
