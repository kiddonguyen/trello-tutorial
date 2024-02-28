import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  // Create layout and provider for route that need clerk auth
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default PlatformLayout;
