"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Edit, Star, Clock, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

interface UserProfile {
  bio: string;
  skills: string[];
  location: string;
  joinedDate: Date;
  totalHoursEarned: number;
  totalHoursSpent: number;
  rating: number;
  reviewCount: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function ProfilePage() {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    bio: "Passionate about helping others and learning new skills.",
    skills: ["Web Development", "Teaching", "Gardening"],
    location: "San Francisco, CA",
    joinedDate: new Date("2024-01-01"),
    totalHoursEarned: 45,
    totalHoursSpent: 32,
    rating: 4.8,
    reviewCount: 12,
  });

  return (
    <div
      className="min-h-screen relative pb-12"
      style={{
        backgroundImage: 'url("/ti.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/80 to-white/90 backdrop-blur-[2px]" />

      <motion.div
        className="relative z-10 container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Header Card */}
        <motion.div variants={cardVariants}>
          <Card className="mb-8 bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Avatar className="h-20 w-20 ring-2 ring-lime-500/20">
                      <AvatarImage src={user?.imageUrl} />
                      <AvatarFallback className="bg-gradient-to-br from-lime-100 to-emerald-100">
                        {user?.firstName?.charAt(0)}
                        {user?.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <div>
                    <motion.h1
                      className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                    >
                      {user?.firstName} {user?.lastName}
                    </motion.h1>
                    <p className="text-muted-foreground">
                      Member since {profile.joinedDate.toLocaleDateString()}
                    </p>
                    <div className="flex items-center mt-2 space-x-4">
                      <motion.div
                        className="flex items-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                        <span>{profile.rating}</span>
                        <span className="text-muted-foreground ml-1">
                          ({profile.reviewCount} reviews)
                        </span>
                      </motion.div>
                      <motion.div
                        className="flex items-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Clock className="h-4 w-4 text-lime-600 mr-1" />
                        <span className="text-lime-700">
                          {profile.totalHoursEarned - profile.totalHoursSpent}{" "}
                          hours available
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-white/50 hover:bg-white/80 transition-colors"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-white/50 hover:bg-white/80 transition-colors"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs Section */}
        <motion.div variants={cardVariants}>
          <Tabs defaultValue="about" className="space-y-4">
            <TabsList className="bg-white/50 backdrop-blur-sm border border-white/20">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Bio</label>
                        <Textarea
                          value={profile.bio}
                          onChange={(e) =>
                            setProfile({ ...profile, bio: e.target.value })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Location</label>
                        <Input
                          value={profile.location}
                          onChange={(e) =>
                            setProfile({ ...profile, location: e.target.value })
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
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
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services">
              <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle>My Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Mock services data */}
                    {[
                      {
                        id: "1",
                        title: "Web Development",
                        description: "Professional web development services",
                        category: "Technology",
                        hoursPerSession: 2,
                        isActive: true,
                      },
                      {
                        id: "2",
                        title: "Language Teaching",
                        description: "Spanish language lessons for beginners",
                        category: "Education",
                        hoursPerSession: 1,
                        isActive: true,
                      },
                    ].map((service) => (
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
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle>Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Mock reviews data */}
                    {[
                      {
                        id: "1",
                        rating: 5,
                        comment: "Excellent web development work!",
                        from: {
                          name: "John Doe",
                          avatar: "/avatars/john.jpg",
                        },
                        service: "Web Development",
                        date: new Date("2024-03-15"),
                      },
                      {
                        id: "2",
                        rating: 4,
                        comment: "Great Spanish lessons, very patient teacher.",
                        from: {
                          name: "Sarah Smith",
                        },
                        service: "Language Teaching",
                        date: new Date("2024-03-10"),
                      },
                    ].map((review) => (
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
                                <p className="font-medium">
                                  {review.from.name}
                                </p>
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

            <TabsContent value="history">
              <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Mock transaction data */}
                    {[
                      {
                        id: "1",
                        type: "earned",
                        amount: 2,
                        service: "Web Development",
                        with: "John Doe",
                        date: new Date("2024-03-20"),
                        status: "completed",
                      },
                      {
                        id: "2",
                        type: "spent",
                        amount: 1,
                        service: "Language Lessons",
                        with: "Maria Garcia",
                        date: new Date("2024-03-18"),
                        status: "completed",
                      },
                    ].map((transaction) => (
                      <div
                        key={transaction.id}
                        className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">
                              {transaction.service}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              with {transaction.with} •{" "}
                              {transaction.date.toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p
                              className={`font-medium ${
                                transaction.type === "earned"
                                  ? "text-green-600"
                                  : "text-orange-600"
                              }`}
                            >
                              {transaction.type === "earned" ? "+" : "-"}
                              {transaction.amount} hours
                            </p>
                            <p className="text-xs text-muted-foreground capitalize">
                              {transaction.status}
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
        </motion.div>
      </motion.div>
    </div>
  );
}
