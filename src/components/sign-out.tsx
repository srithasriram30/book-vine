"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const SignOut = () => {
  const handleSignOut = async () => {
    await signOut();
    redirect('/')
  };

  return (
    <div className="flex justify-center">
      <Button variant="destructive" onClick={handleSignOut}>
        Logout
      </Button>
    </div>
  );
};

export { SignOut };