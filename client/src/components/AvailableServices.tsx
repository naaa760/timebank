import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

interface Service {
  id: string;
  title: string;
  provider: string;
  rating: number;
  hoursRequired: number;
  category: string;
  tags: string[];
}

export default function AvailableServices() {
  const services: Service[] = [
    {
      id: "1",
      title: "Professional Web Development",
      provider: "Alex Johnson",
      rating: 4.8,
      hoursRequired: 2,
      category: "Technology",
      tags: ["React", "Next.js", "Frontend"],
    },
    {
      id: "2",
      title: "Spanish Language Tutoring",
      provider: "Maria Garcia",
      rating: 4.9,
      hoursRequired: 1,
      category: "Education",
      tags: ["Language", "Beginner", "Conversation"],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Available Services</h3>
        <Link
          href="/services"
          className="text-sm text-primary hover:underline flex items-center"
        >
          View All
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="grid gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium">{service.title}</h4>
                <p className="text-sm text-muted-foreground">
                  by {service.provider}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{service.rating}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm font-medium text-primary">
                {service.hoursRequired}h
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
