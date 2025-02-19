"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { communityApi } from "@/lib/api/community";
import { toast } from "sonner";

interface ServiceDetails {
  id: string;
  title: string;
  provider: string;
  duration: number;
  description: string;
}

export default function RequestServicePage() {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // This would come from the service you're requesting
  const serviceDetails: ServiceDetails = {
    id: "1",
    title: "Professional Web Development",
    provider: "John Doe",
    duration: 2,
    description: "Expert web development services using modern technologies...",
  };

  const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

  const handleConfirmBooking = async () => {
    if (!date || !timeSlot) {
      toast.error("Please select both date and time");
      return;
    }

    setIsSubmitting(true);
    try {
      // Create the booking
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: serviceDetails.id,
          date,
          timeSlot,
          providerId: serviceDetails.provider,
          duration: serviceDetails.duration,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      toast.success("Booking confirmed successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to confirm booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Request Service</CardTitle>
          <CardDescription>
            Schedule a session for {serviceDetails.title} with{" "}
            {serviceDetails.provider}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service Details */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Service Details</h3>
                <p className="text-sm text-muted-foreground">
                  {serviceDetails.description}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Duration</h4>
                <p className="text-sm text-muted-foreground">
                  {serviceDetails.duration} hours
                </p>
              </div>
            </div>

            {/* Calendar */}
            <div>
              <h3 className="font-medium mb-2">Select Date</h3>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                disabled={(date) => date < new Date()}
              />
            </div>

            {/* Time Slots */}
            {date && (
              <div className="md:col-span-2">
                <h3 className="font-medium mb-2">Available Time Slots</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setTimeSlot(slot)}
                      className={`p-2 text-sm rounded-md border transition-colors ${
                        timeSlot === slot
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Summary and Actions */}
            {date && timeSlot && (
              <div className="md:col-span-2 space-y-4">
                <div className="rounded-lg bg-muted p-4">
                  <h3 className="font-medium mb-2">Booking Summary</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <span className="text-muted-foreground">Service:</span>{" "}
                      {serviceDetails.title}
                    </li>
                    <li>
                      <span className="text-muted-foreground">Provider:</span>{" "}
                      {serviceDetails.provider}
                    </li>
                    <li>
                      <span className="text-muted-foreground">Date:</span>{" "}
                      {format(date, "PPP")}
                    </li>
                    <li>
                      <span className="text-muted-foreground">Time:</span>{" "}
                      {timeSlot}
                    </li>
                    <li>
                      <span className="text-muted-foreground">Duration:</span>{" "}
                      {serviceDetails.duration} hours
                    </li>
                  </ul>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmBooking}
                    disabled={isSubmitting || !date || !timeSlot}
                  >
                    {isSubmitting ? "Confirming..." : "Confirm Booking"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
