"use client";

import { MAX_FREE_COUNTS } from "@/constants";
import { useProModal } from "@/hooks/use-pro-modal";
import { CircularProgress } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";

// Interface to define prop types for the FreeCounter component
interface CollapsedFreeCounterProps {
  apiLimitCount: number; // Number of API calls made
  isPro: boolean; // Flag to check if the user is using the Pro version
}

const CollapsedFreeCounter = ({
  apiLimitCount = 0,
  isPro = false,
}: CollapsedFreeCounterProps) => {
  // Get the Pro modal from the useProModal hook
  const proModal = useProModal();

  // State to track if the component is mounted
  const [mounted, setMounted] = useState(false);

  // Effect to set the mounted state to true when the component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // If the component is not yet mounted, return null (render nothing)
  if (!mounted) {
    return null;
  }

  // If the user is using the Pro version, return null (render nothing)
  if (isPro) {
    return null;
  }
  return (
    <div className="flex flex-col gap-6  w-full justify-center pb-7 items-center">
      <CircularProgress
        size="lg"
        color="success"
        value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
        aria-label="Loading..."
        showValueLabel={true}
        valueLabel={`${apiLimitCount} / ${MAX_FREE_COUNTS}`}
      />
      <Button
        onClick={proModal.onOpen}
        variant="novi"
        className="p-2 w-10 h-10 "
      >
        <Zap className="w-5 h-5 fill-white" />
      </Button>
    </div>
  );
};

export default CollapsedFreeCounter;
