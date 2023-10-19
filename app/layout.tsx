// Import global CSS styles from "./globals.css"
import "./globals.css";

// Import necessary types from the "next" package
import type { Metadata } from "next";

// Import the Inter font from Google Fonts
import { Inter } from "next/font/google";

// Import required components and providers
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/components/modal-provider";
import { ToasterProvider } from "@/components/toaster-provider";
import { CrispProvider } from "@/components/crisp-provider";

// Import utility function 'cn' from "@/lib/utils"
import { cn } from "@/lib/utils";
import ThemeContextProvider from "@/context/theme-context";
import ThemeSwitch from "@/components/theme-switch";
import { Providers } from "./providers";

// Create an instance of the Inter font with "latin" subset
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the page
export const metadata: Metadata = {
  title: "AI Platform",
  description: "Generated by create next app",
};

// RootLayout function component that serves as a layout for the application
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Wrap the entire content with the ClerkProvider to enable user authentication
    <ClerkProvider>
      {/* Set the language of the document to "en" */}
      <html lang="en">
        {/* Initialize the CrispProvider to enable Crisp chat */}
        {/* <CrispProvider />  */}

        {/* Set the body class name to include "h-screen" and the className from the Inter font */}
        <body className={cn("max-h-screen", inter.className)}>
          <Providers>
            <ThemeContextProvider>
              {/* Wrap the content with ModalProvider to handle modals */}
              <ModalProvider />

              {/* Wrap the content with ToasterProvider to handle toast notifications */}
              <ToasterProvider />
              {/* <ThemeSwitch /> */}
              {/* Render the children (main content) */}
              {children}
            </ThemeContextProvider>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
