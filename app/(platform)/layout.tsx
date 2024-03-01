import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  // Create layout and provider for route that need clerk auth
  return (
    <ClerkProvider>
      <Toaster />
      {children}
    </ClerkProvider>
  );
};

export default PlatformLayout;
