import type { Metadata } from "next";
import "./globals.css";
import {
  ClerkProvider,
  SignedOut,
  SignIn,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";

import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider signInFallbackRedirectUrl={"/"}>
      <html lang="en" suppressHydrationWarning>
        <body className={cn("bg-secondary", inter.className)}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      
            {children}

            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
