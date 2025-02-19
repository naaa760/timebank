"use client";

import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded: authLoaded, userId } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (!authLoaded || !userLoaded) {
        console.log("Auth not loaded yet");
        return;
      }

      if (!userId || !user) {
        console.log("No user to sync");
        return;
      }

      try {
        console.log("Starting user sync...", {
          userId,
          email: user.emailAddresses[0]?.emailAddress,
          firstName: user.firstName,
          username: user.username,
        });

        const response = await fetch("/api/auth/create-user", {
          method: "POST",
        });

        const responseText = await response.text();
        console.log("Raw response:", responseText);

        if (!response.ok) {
          console.error("Sync failed:", responseText);
          return;
        }

        try {
          const result = JSON.parse(responseText);
          console.log("Sync successful:", result);
        } catch (e) {
          console.error("Error parsing response:", e);
        }
      } catch (error) {
        console.error("Sync error:", error);
      }
    };

    syncUser();
  }, [authLoaded, userLoaded, userId, user]);

  return <>{children}</>;
}
