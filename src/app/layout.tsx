"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
// import UserProvider from "@/providers/UserProvider"; // Corrected import

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const tokenData = jwtDecode(token);
      console.log(tokenData);

      const expiry = tokenData?.exp;
      if (expiry && Date.now() >= expiry * 1000) {
        throw new Error("Token expired");
      }
    } catch (error) {
      console.error("Invalid token", error);
      router.push("/login");
    }
    //  finally {
    //   setLoading(false);
    // }
  }, [router]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return <>{children}</>;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* <UserProvider> */}
        <AuthenticationProvider>{children}</AuthenticationProvider>
        {/* </UserProvider> */}
        <Toaster />
      </body>
    </html>
  );
}
