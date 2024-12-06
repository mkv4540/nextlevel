import { SignOutButton, useUser } from "@clerk/nextjs";

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", padding: "10px", backgroundColor: "#f0f0f0" }}>
        <h1>Dashboard</h1>
        <div>
          <span>Welcome, {user?.firstName || "User"}! </span>
          <SignOutButton>
            <button style={{ marginLeft: "10px", padding: "5px 10px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px" }}>
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </header>
      <main>
        <p>Your phone number: {user?.primaryPhoneNumber?.phoneNumber}</p>
      </main>
    </div>
  );
}
