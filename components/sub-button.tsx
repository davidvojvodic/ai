"use client";

// Import necessary modules
import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

// SubButton component definition
interface SubButtonProps {
  isPro: boolean;
}

export const SubButton = ({ isPro = false }: SubButtonProps) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Nekaj je šlo narobe");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Button component to manage subscription or upgrade
    <Button
      disabled={loading}
      variant={isPro ? "default" : "novi"}
      onClick={onClick}
    >
      {isPro ? "Upravljaj naročnino" : "Nadgradi"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};
