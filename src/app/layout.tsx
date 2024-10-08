import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { AuthProvider } from "../utility/context/authContext";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To Do List - Jariz",
  description: "Create a to do list with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
