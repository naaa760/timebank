"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Star, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PublicProfile {
  id: string;
  name: string;
  avatar?: string;
  bio: string;
  skills: string[];
  location: string;
  joinedDate: Date;
  rating: number;
  reviewCount: number;
  activeServices: {
    id: string;
    title: string;
    description: string;
    category: string;
    hoursPerSession: number;
  }[];
  reviews: {
    id: string;
    rating: number;
    comment: string;
    from: {
      name: string;
      avatar?: string;
    };
    service: string;
    date: Date;
  }[];
}

export default function ViewProfilePage() {
  const params = useParams();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // TODO: Replace with actual API call
        const mockProfile: PublicProfile = {
          id: params.id as string,
          name: "John Doe",
          avatar: "/avatars/john.jpg",
          bio: "Professional web developer with 5 years of experience",
          skills: ["React", "Next.js", "TypeScript"],
          location: "New York, NY",
          joinedDate: new Date("2023-12-01"),
          rating: 4.9,
          reviewCount: 23,
          activeServices: [
            {
              id: "1",
              title: "Web Development",
              description: "Professional web development services",
              category: "Technology",
              hoursPerSession: 2,
            },
          ],
          reviews: [
            {
              id: "1",
              rating: 5,
              comment: "Excellent work and communication!",
              from: {
                name: "Sarah Wilson",
                avatar: "/avatars/sarah.jpg",
              },
              service: "Web Development",
              date: new Date("2024-03-15"),
            },
          ],
        };

        setProfile(mockProfile);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [params.id]);

  if (isLoading || !profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback>
                  {profile.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <p className="text-muted-foreground">
                  Member since {profile.joinedDate.toLocaleDateString()}
                </p>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{profile.rating}</span>
                    <span className="text-muted-foreground ml-1">
                      ({profile.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{profile.location}</span>
                  </div>
                </div>
              </div>
            </div>
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="about" className="space-y-4">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        {/* About Tab */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{profile.bio}</p>
              <div>
                <h3 className="font-medium mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Active Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.activeServices.map((service) => (
                  <div
                    key={service.id}
                    className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{service.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {service.description}
                        </p>
                        <div className="flex items-center mt-2 space-x-2">
                          <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {service.category}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {service.hoursPerSession} hours/session
                          </span>
                        </div>
                      </div>
                      <Button>Request Service</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={review.from.avatar} />
                        <AvatarFallback>
                          {review.from.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-200"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="font-medium">{review.from.name}</p>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {review.date.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="mt-2">{review.comment}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Service: {review.service}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
