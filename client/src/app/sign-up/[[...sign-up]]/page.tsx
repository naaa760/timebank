import { SignUp, useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();

  if (!user) {
    return <SignUp />;
  }

  return <div>Welcome!</div>;
}
