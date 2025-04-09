import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const GoogleSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button className="w-full" variant="outline">
        <Image src='./icons/google-icon' alt='google icon' width={48} height={48} />
        Continue with Google
      </Button>
    </form>
  );
};

export { GoogleSignIn };