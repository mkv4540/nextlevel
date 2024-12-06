"use client";
import { useAuth, RedirectToHome } from "@clerk/nextjs";
import { PhoneSignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  const { isLoaded, userId } = useAuth();

  // Redirect authenticated users to home page
  if (isLoaded && userId) {
    return <RedirectToHome />;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <PhoneSignUp
        redirectUrl="/"
        // This will prevent the password input from showing
        hidePassword={true}
      />
    </div>
  );
}

