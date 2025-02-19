"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import {
  Bell,
  Lock,
  Mail,
  Shield,
  Smartphone,
  User,
  Globe,
  Languages,
  Clock,
  CreditCard,
  BellRing,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    serviceRequests: boolean;
    messages: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisibility: "public" | "private";
    showLocation: boolean;
    showActivity: boolean;
  };
  preferences: {
    language: string;
    timezone: string;
    currency: string;
    dateFormat: string;
  };
  security: {
    twoFactorAuth: boolean;
    loginNotifications: boolean;
    deviceHistory: boolean;
  };
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

export default function SettingsPage() {
  const { user } = useUser();
  const [settings, setSettings] = useState<UserSettings>({
    notifications: {
      email: true,
      push: true,
      serviceRequests: true,
      messages: true,
      marketing: false,
    },
    privacy: {
      profileVisibility: "public",
      showLocation: true,
      showActivity: true,
    },
    preferences: {
      language: "en",
      timezone: "UTC",
      currency: "USD",
      dateFormat: "MM/DD/YYYY",
    },
    security: {
      twoFactorAuth: false,
      loginNotifications: false,
      deviceHistory: false,
    },
  });

  const handleNotificationChange = (
    key: keyof UserSettings["notifications"]
  ) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    });
  };

  const handlePrivacyChange = (key: keyof UserSettings["privacy"]) => {
    if (key === "profileVisibility") return; // Handled by Select
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: !settings.privacy[key],
      },
    });
  };

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
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.h1
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Settings
          </motion.h1>

          {/* Account Settings */}
          <motion.div variants={cardVariants}>
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">Profile Information</p>
                    <p className="text-sm text-muted-foreground">
                      Update your personal information
                    </p>
                  </div>
                  <Button variant="outline">Edit</Button>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">Email Address</p>
                    <p className="text-sm text-muted-foreground">
                      {user?.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                  <Button variant="outline">Change</Button>
                </div>
                <div className="flex items-center space-x-4">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">Password</p>
                    <p className="text-sm text-muted-foreground">
                      Last changed 3 months ago
                    </p>
                  </div>
                  <Button variant="outline">Update</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notification Settings */}
          <motion.div variants={cardVariants}>
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Choose how you want to be notified
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive email updates
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.notifications.email}
                    onCheckedChange={() => handleNotificationChange("email")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.notifications.push}
                    onCheckedChange={() => handleNotificationChange("push")}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Privacy Settings */}
          <motion.div variants={cardVariants}>
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>Privacy</CardTitle>
                <CardDescription>
                  Manage your privacy preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Profile Visibility</p>
                      <p className="text-sm text-muted-foreground">
                        Control who can see your profile
                      </p>
                    </div>
                  </div>
                  <Select
                    value={settings.privacy.profileVisibility}
                    onValueChange={(value: "public" | "private") =>
                      setSettings({
                        ...settings,
                        privacy: {
                          ...settings.privacy,
                          profileVisibility: value,
                        },
                      })
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Activity Visibility</p>
                      <p className="text-sm text-muted-foreground">
                        Show your activity to others
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.privacy.showActivity}
                    onCheckedChange={() => handlePrivacyChange("showActivity")}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Preferences Settings */}
          <motion.div variants={cardVariants}>
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Languages className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Language</p>
                      <p className="text-sm text-muted-foreground">
                        Choose your preferred language
                      </p>
                    </div>
                  </div>
                  <Select
                    value={settings.preferences.language}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        preferences: {
                          ...settings.preferences,
                          language: value,
                        },
                      })
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Time Zone</p>
                      <p className="text-sm text-muted-foreground">
                        Set your local time zone
                      </p>
                    </div>
                  </div>
                  <Select
                    value={settings.preferences.timezone}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        preferences: {
                          ...settings.preferences,
                          timezone: value,
                        },
                      })
                    }
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security Settings */}
          <motion.div variants={cardVariants}>
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Protect your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Setup 2FA</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <BellRing className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Login Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified about new sign-ins
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.security?.loginNotifications}
                    onCheckedChange={() =>
                      setSettings({
                        ...settings,
                        security: {
                          ...settings.security,
                          loginNotifications:
                            !settings.security?.loginNotifications,
                        },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <AlertCircle className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Device History</p>
                      <p className="text-sm text-muted-foreground">
                        Manage devices that have accessed your account
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">View Devices</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment Settings */}
          <motion.div variants={cardVariants}>
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Payment Methods</p>
                      <p className="text-sm text-muted-foreground">
                        Add or remove payment methods
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Manage</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Save Changes Button */}
          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button className="bg-gradient-to-r from-lime-600 to-emerald-600 text-white hover:from-lime-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all">
              Save Changes
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
