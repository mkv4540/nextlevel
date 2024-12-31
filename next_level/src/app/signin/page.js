// "use client";
// import { useState } from "react";
// import { SignIn } from "@clerk/nextjs";
// import { useAuth } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";

// export default function SignInPage() {
//   const [rememberMe, setRememberMe] = useState(false);
//   const { isLoaded, userId } = useAuth();
//   const router = useRouter();

//   // Redirect authenticated users to the home page
//   if (isLoaded && userId) {
//     router.push("/");
//     return null;
//   }

//   // Handle remember me option change
//   const handleRememberMeChange = (e) => {
//     setRememberMe(e.target.checked);
//   };

//   return (
//     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//       <SignIn
//         redirectUrl="/"
//         afterSignInUrl="/"
//         options={{
//           rememberMe,
//         }}
//       />
//       <div>
//         <label>
//           <input
//             type="checkbox"
//             checked={rememberMe}
//             onChange={handleRememberMeChange}
//           />
//           Remember me for a month
//         </label>
//       </div>
//     </div>
//   );
// }

