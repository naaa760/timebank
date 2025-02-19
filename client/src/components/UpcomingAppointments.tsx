"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Appointment {
  id: string;
  service: string;
  with: {
    id: string;
    name: string;
    avatar?: string;
  };
  date: Date;
  duration: number;
  location: string;
  status: "upcoming" | "completed" | "cancelled";
}

export default function UpcomingAppointments() {
  // Mock data - would come from context
  const appointments: Appointment[] = [
    {
      id: "1",
      service: "Web Development",
      with: {
        id: "user1",
        name: "John Doe",
        avatar: "/avatars/john.jpg",
      },
      date: new Date("2024-03-25T14:00:00"),
      duration: 2,
      location: "Online",
      status: "upcoming",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>Your scheduled services</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg"
            >
              <Avatar>
                <AvatarImage src={appointment.with.avatar} />
                <AvatarFallback>
                  {appointment.with.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{appointment.service}</h4>
                    <p className="text-sm text-muted-foreground">
                      with {appointment.with.name}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {appointment.date.toLocaleDateString()} at{" "}
                    {appointment.date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {appointment.duration} hours
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {appointment.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
