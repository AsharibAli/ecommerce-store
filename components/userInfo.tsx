"use client";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Example({
  msg,
  greeting,
}: {
  msg: string;
  greeting: string;
}) {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  console.log("users", user);

  return (
    <>
      <div className="ml-auto flex justify-end  items-center gap-2 p-2 ">
        <h4>
          {greeting},{" "}
          <span className="text-primary font-semibold">{user.firstName}</span>{" "}
          {msg}{" "}
        </h4>
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
}
{
  /* <UserButton afterSignOutUrl="/"/>   */
}
