import { Star, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface ServiceCardProps {
  service?: {
    id: string;
    title: string;
    description: string;
    provider: {
      name: string;
      rating: number;
      totalReviews: number;
    };
    duration: number;
    tags: string[];
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  // Mock data for development
  const mockService = {
    id: "1",
    title: "Professional Web Development",
    description: "Expert web development services using modern technologies...",
    provider: {
      name: "John Doe",
      rating: 4.8,
      totalReviews: 56,
    },
    duration: 2,
    tags: ["React", "Next.js", "TypeScript"],
  };

  const data = service || mockService;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>
          <div className="flex items-center space-x-2 text-sm">
            <User className="h-4 w-4" />
            <span>{data.provider.name}</span>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1">{data.provider.rating}</span>
              <span className="text-muted-foreground">
                ({data.provider.totalReviews} reviews)
              </span>
            </div>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{data.description}</p>
        <div className="flex flex-wrap gap-2">
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          {data.duration} hours per session
        </div>
        <Button asChild>
          <Link href={`/services/request-service?id=${data.id}`}>
            Request Service
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
