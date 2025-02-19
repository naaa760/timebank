import { Star, Clock, User, ChevronRight } from "lucide-react";
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
    <Card className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardHeader className="relative">
        <CardTitle className="text-lg font-semibold text-primary">
          {data.title}
        </CardTitle>
        <CardDescription>
          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center space-x-1 bg-primary/10 rounded-full px-2 py-1">
              <User className="h-4 w-4 text-primary" />
              <span className="text-primary-foreground">
                {data.provider.name}
              </span>
            </div>
            <div className="flex items-center bg-yellow-400/20 rounded-full px-2 py-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 font-medium text-yellow-700">
                {data.provider.rating}
              </span>
              <span className="text-yellow-700/70 text-xs ml-1">
                ({data.provider.totalReviews} reviews)
              </span>
            </div>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="relative">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {data.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="relative flex justify-between items-center">
        <div className="flex items-center text-sm text-muted-foreground bg-primary/10 rounded-full px-3 py-1">
          <Clock className="h-4 w-4 mr-2 text-primary" />
          {data.duration} hours per session
        </div>
        <Button
          asChild
          variant="ghost"
          className="group/button hover:bg-primary/20"
        >
          <Link
            href={`/services/request-service?id=${data.id}`}
            className="flex items-center"
          >
            Request Service
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
