"use client";

import { useUser } from "@clerk/nextjs";

export default function ProtectedRoutePage() {
  const { user } = useUser();

  return (
    <div>
      <h1>Protected Route</h1>
      <p>Only authenticated users can access this page.</p>
    </div>
  );
}
