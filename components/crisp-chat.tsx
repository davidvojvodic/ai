// Import necessary libraries and modules
import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

// Define the CrispChat component
export const CrispChat = () => {
  // useEffect hook runs once when the component is mounted
  useEffect(() => {
    // Configure and initialize the Crisp chat SDK with the provided Crisp website ID
    Crisp.configure("c8f78546-d8d5-4e24-92c6-9f56f27415cf");
  }, []);

  // The component returns null as it is just a wrapper for the Crisp chat integration
  return null;
};
