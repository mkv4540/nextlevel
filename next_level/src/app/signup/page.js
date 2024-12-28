"use client";
import { useAuth } from "@clerk/nextjs";
import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  // Redirect authenticated users to the home page
  if (isLoaded && userId) {
    router.push("/");
    return null;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <SignUp
        redirectUrl="/"
        afterSignUpUrl="/"
        hidePassword={true}
      />
    </div>
  );
}
