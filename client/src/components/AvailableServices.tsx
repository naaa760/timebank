"use client";

import { useEffect } from "react";
import { useDashboard } from "@/contexts/DashboardContext";
import { communityApi } from "@/lib/api/community";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Star, Clock, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { toast } from "sonner";

export default function AvailableServices() {
  const { state, dispatch } = useDashboard();

  useEffect(() => {
    const loadServices = async () => {
      try {
        const services = await communityApi.getServices();
        dispatch({ type: "SET_SERVICES", payload: services });
      } catch (error) {
        console.error("Failed to load services:", error);
        toast.error("Failed to load available services");
      }
    };

    loadServices();
  }, [dispatch]);

  if (state.loading.services) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-64 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (state.error.services) {
    return <div className="text-red-500">{state.error.services}</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {state.services.slice(0, 6).map((service) => (
        <div
          key={service.id}
          className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Avatar className="border-2 border-primary/20">
                  <AvatarImage src={service.provider.avatar} />
                  <AvatarFallback className="bg-primary/20 text-primary-foreground">
                    {service.provider.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg text-primary">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    by {service.provider.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-yellow-400/20 rounded-full px-2 py-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium ml-1 text-yellow-700">
                  {service.provider.rating}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
              {service.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground bg-primary/10 rounded-full px-3 py-1">
                <Clock className="h-4 w-4 mr-2 text-primary" />
                {service.hoursPerSession} hours/session
              </div>
              <Button
                asChild
                variant="ghost"
                className="group/button hover:bg-primary/20"
              >
                <Link
                  href={`/services/request-service?id=${service.id}`}
                  className="flex items-center"
                >
                  Request
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
