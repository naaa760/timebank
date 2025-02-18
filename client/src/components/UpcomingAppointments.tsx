import { Calendar, Clock, User } from "lucide-react";

interface Appointment {
  id: string;
  service: string;
  with: string;
  date: string;
  time: string;
  duration: number;
  status: "scheduled" | "pending" | "cancelled";
}

export default function UpcomingAppointments() {
  const appointments: Appointment[] = [
    {
      id: "1",
      service: "Web Development Session",
      with: "John Doe",
      date: "2024-03-25",
      time: "14:00",
      duration: 2,
      status: "scheduled",
    },
    {
      id: "2",
      service: "Spanish Tutoring",
      with: "Maria Garcia",
      date: "2024-03-26",
      time: "10:00",
      duration: 1,
      status: "scheduled",
    },
  ];

  return (
    <div className="space-y-4">
      {appointments.length === 0 ? (
        <p className="text-center text-muted-foreground py-4">
          No upcoming appointments
        </p>
      ) : (
        appointments.map((apt) => (
          <div
            key={apt.id}
            className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium mb-2">{apt.service}</h4>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{apt.with}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{apt.date}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>
                  {apt.time} ({apt.duration}h)
                </span>
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <button className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                Reschedule
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
