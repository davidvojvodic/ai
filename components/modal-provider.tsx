"use client";

// Import necessary modules
import { useEffect, useState } from "react";
import { ProModal } from "./pro-modal";

// ModalProvider component definition
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* ProModal component is rendered */}
      <ProModal />
    </>
  );
};
