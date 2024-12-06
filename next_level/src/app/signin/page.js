// "use client";

// import { SignIn } from "@clerk/nextjs";

// export default function SignInPage() {
//   return (
//     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//       <SignIn
//         path="/signin"
//         routing="path"
//         redirectUrl="/dashboard"
//         appearance={{
//           layout: {
//             showRememberMe: true, // "Remember Me" for a month
//           },
//         }}
//         signInOptions={{
//           strategy: "phone_number_code", // Use OTP via phone
//         }}
//       />
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { PhoneSignIn } from "@clerk/nextjs";
import { useAuth, RedirectToHome } from "@clerk/nextjs";

export default function SignInPage() {
  const [rememberMe, setRememberMe] = useState(false);
  const { isLoaded, userId } = useAuth();

  // Redirect authenticated users to home page
  if (isLoaded && userId) {
    return <RedirectToHome />;
  }

  // Handle remember me option change
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <PhoneSignIn
        redirectUrl="/"
        afterSignInUrl="/"
        // Remember me option for session persistence
        options={{
          rememberMe,
        }}
      />
      <div>
        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          Remember me for a month
        </label>
      </div>
    </div>
  );
}



