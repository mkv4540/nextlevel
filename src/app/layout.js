import "./globals.css";

export const metadata = {
  title: "Next.js Academy",
  description: "Learn with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
