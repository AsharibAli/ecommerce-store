"use client"
import { useUser } from "@clerk/nextjs";

export default function Example() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  console.log("users",user)

  return <div>Hello, {user.firstName} welcome to Dino Market</div>;
}