import { SignIn, useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();

  if (!user) {
    return <SignIn />;
  }

  return <div>Welcome!</div>;
}
