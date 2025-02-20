"use client";

import { useState, useEffect } from "react";
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

import { toast } from "sonner";

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

// Add these language options with icons
const languages = [
  { id: "en", name: "English", icon: "🇺🇸" },
  { id: "es", name: "Español", icon: "🇪🇸" },
  { id: "fr", name: "Français", icon: "🇫🇷" },
];

// Add timezone options with icons
const timezones = [
  { id: "UTC", name: "UTC", icon: "🌍" },
  { id: "EST", name: "Eastern Time", icon: "🌎" },
  { id: "PST", name: "Pacific Time", icon: "🌏" },
];

// Add visibility options with icons
const visibilityOptions = [
  { id: "public", name: "Public", icon: "🌐" },
  { id: "private", name: "Private", icon: "🔒" },
];

export default function SettingsPage() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSettingChange = <
    T extends keyof UserSettings,
    K extends keyof UserSettings[T]
  >(
    category: T,
    key: K,
    value: UserSettings[T][K]
  ) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const handleEditProfile = async () => {
    try {
      toast.info("Redirecting to profile editor...");
      // Add your profile edit logic/navigation here
    } catch (error: unknown) {
      console.error("Profile edit failed:", error);
      toast.error("Failed to edit profile. Please try again.");
    }
  };

  const handleChangeEmail = async () => {
    try {
      toast.info("Redirecting to email change...");
      // Add your email change logic here
    } catch (error: unknown) {
      console.error("Email change failed:", error);
      toast.error("Failed to change email. Please try again.");
    }
  };

  const handleUpdatePassword = async () => {
    try {
      toast.info("Redirecting to password update...");
      // Add your password update logic here
    } catch (error: unknown) {
      console.error("Password update failed:", error);
      toast.error("Failed to update password. Please try again.");
    }
  };

  const saveSettings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          settings,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      toast.success("Settings saved successfully!");
    } catch (error) {
      console.error("Failed to save settings:", error);
      toast.error("Failed to save settings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FASetup = async () => {
    try {
      toast.info("2FA setup process initiated");
    } catch (error: unknown) {
      console.error("2FA setup failed:", error);
      toast.error("Failed to setup 2FA. Please try again.");
    }
  };

  const handleViewDevices = () => {
    try {
      toast.info("Device history feature coming soon!");
    } catch (error: unknown) {
      console.error("Device history failed:", error);
      toast.error("Failed to load devices. Please try again.");
    }
  };

  const handleManagePayments = () => {
    try {
      toast.info("Payment management feature coming soon!");
    } catch (error: unknown) {
      console.error("Payment management failed:", error);
      toast.error("Failed to load payment methods. Please try again.");
    }
  };

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch("/api/settings");
        if (response.ok) {
          const data = await response.json();
          setSettings(data.settings);
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
        toast.error("Failed to load settings");
      }
    };

    if (user?.id) {
      loadSettings();
    }
  }, [user?.id]);

  return (
    <div className="min-h-screen relative">
      {/* Beautiful gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-white to-lime-50" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(200,255,200,0.2),transparent_50%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(220,220,220,0.2),transparent_50%)]" />

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
                  <Button
                    variant="outline"
                    onClick={handleEditProfile}
                    disabled={isLoading}
                  >
                    Edit
                  </Button>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">Email Address</p>
                    <p className="text-sm text-muted-foreground">
                      {user?.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleChangeEmail}
                    disabled={isLoading}
                  >
                    Change
                  </Button>
                </div>
                <div className="flex items-center space-x-4">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">Password</p>
                    <p className="text-sm text-muted-foreground">
                      Last changed 3 months ago
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleUpdatePassword}
                    disabled={isLoading}
                  >
                    Update
                  </Button>
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
                    onCheckedChange={(checked) =>
                      handleSettingChange("notifications", "email", checked)
                    }
                    disabled={isLoading}
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
                    onCheckedChange={(checked) =>
                      handleSettingChange("notifications", "push", checked)
                    }
                    disabled={isLoading}
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
                <div className="flex items-center space-x-4">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Profile Visibility</p>
                    <div className="flex gap-3 mt-2">
                      {visibilityOptions.map((option) => (
                        <motion.div
                          key={option.id}
                          onClick={() =>
                            handleSettingChange(
                              "privacy",
                              "profileVisibility",
                              option.id as "public" | "private"
                            )
                          }
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer 
                            transition-all duration-300 ${
                              settings.privacy.profileVisibility === option.id
                                ? "bg-gradient-to-r from-emerald-500 to-lime-500 text-white shadow-lg"
                                : "bg-white/60 hover:bg-white/80"
                            }`}
                        >
                          <span>{option.icon}</span>
                          <span>{option.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
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
                    onCheckedChange={(checked) =>
                      handleSettingChange("privacy", "showActivity", checked)
                    }
                    disabled={isLoading}
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
                <div className="flex items-center space-x-4">
                  <Languages className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Language</p>
                    <div className="flex flex-wrap gap-3 mt-2">
                      {languages.map((lang) => (
                        <motion.div
                          key={lang.id}
                          onClick={() =>
                            !isLoading &&
                            handleSettingChange(
                              "preferences",
                              "language",
                              lang.id
                            )
                          }
                          className={`${
                            isLoading
                              ? "opacity-50 cursor-not-allowed"
                              : "cursor-pointer"
                          } flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                            settings.preferences.language === lang.id
                              ? "bg-gradient-to-r from-emerald-500 to-lime-500 text-white shadow-lg"
                              : "bg-white/60 hover:bg-white/80"
                          }`}
                        >
                          <span>{lang.icon}</span>
                          <span>{lang.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Time Zone</p>
                    <div className="flex flex-wrap gap-3 mt-2">
                      {timezones.map((tz) => (
                        <motion.div
                          key={tz.id}
                          onClick={() =>
                            handleSettingChange(
                              "preferences",
                              "timezone",
                              tz.id
                            )
                          }
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer 
                            transition-all duration-300 ${
                              settings.preferences.timezone === tz.id
                                ? "bg-gradient-to-r from-emerald-500 to-lime-500 text-white shadow-lg"
                                : "bg-white/60 hover:bg-white/80"
                            }`}
                        >
                          <span>{tz.icon}</span>
                          <span>{tz.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
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
                  <Button
                    variant="outline"
                    onClick={handle2FASetup}
                    disabled={isLoading}
                  >
                    Setup 2FA
                  </Button>
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
                    onCheckedChange={(checked) =>
                      handleSettingChange(
                        "security",
                        "loginNotifications",
                        checked
                      )
                    }
                    disabled={isLoading}
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
                  <Button
                    variant="outline"
                    onClick={handleViewDevices}
                    disabled={isLoading}
                  >
                    View Devices
                  </Button>
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
                  <Button
                    variant="outline"
                    onClick={handleManagePayments}
                    disabled={isLoading}
                  >
                    Manage
                  </Button>
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
            <Button
              onClick={saveSettings}
              disabled={isLoading}
              className="bg-gradient-to-r from-lime-600 to-emerald-600 text-white 
                hover:from-lime-700 hover:to-emerald-700 shadow-lg hover:shadow-xl 
                transition-all min-w-[120px]"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  <span>Saving...</span>
                </div>
              ) : (
                "Save Changes"
              )}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
