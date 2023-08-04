"use client";

// Import necessary modules and components
import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";

// Interface to define prop types for the FreeCounter component
interface FreeCounterProps {
  apiLimitCount: number; // Number of API calls made
  isPro: boolean; // Flag to check if the user is using the Pro version
}

export const FreeCounter = ({
  apiLimitCount = 0,
  isPro = false,
}: FreeCounterProps) => {
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
    // Container div with padding
    <div className="px-2 xl:px-3">
      {/* Card to display the API usage */}
      <Card className="bg-white/10 border-0">
        {/* Card content */}
        <CardContent className="py-3 2xl:py-6">
          {/* Section to display the API usage count */}
          <div className="text-center text-sm text-white mb-4 space-y-2">
            {/* Display the current and maximum API usage counts */}
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Uporabljenih žetonov
            </p>
            {/* Progress bar to visually represent the API usage */}
            <Progress
              className="h-3"
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
            />
          </div>
          {/* Button to upgrade to Pro version */}
          <Button onClick={proModal.onOpen} variant="novi" className="w-full">
            Nadgradi
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
