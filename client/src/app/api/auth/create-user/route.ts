import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST() {
  try {
    console.log("Starting create-user handler");

    const authResult = await auth();
    const user = await currentUser();

    console.log("Auth result:", { userId: authResult.userId });
    console.log("Current user:", {
      id: user?.id,
      email: user?.emailAddresses[0]?.emailAddress,
    });

    if (!authResult.userId || !user) {
      console.error("No user found in auth context");
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = {
      clerkUserId: authResult.userId,
      email: user.emailAddresses[0].emailAddress,
      name: user.firstName || user.username || "New User",
    };

    console.log("Sending user data to backend:", userData);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/sync-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    // Try to parse as JSON first
    let data;
    const responseText = await response.text();
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { message: responseText };
    }

    if (!response.ok) {
      throw new Error(data.error || `Sync failed: ${responseText}`);
    }

    return Response.json(data);
  } catch (error) {
    console.error("Error in create-user:", error);
    return Response.json(
      {
        error: "Failed to sync user",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
