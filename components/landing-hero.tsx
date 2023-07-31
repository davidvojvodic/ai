"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>Orodja umetne inteligence za</h1>
        <div className="text-transparent h-[100px] bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypewriterComponent
            options={{
              strings: [
                "Pogovor.",
                "Ustvarjanje slik.",
                "Ustvarjanje kode.",
                "Ustvarjanje videa.",
                "Ustvarjanje glasbe.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Ustvarite vsebino z umetno inteligenco 10x hitreje
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="premium"
            className="md:text-lg p-4 md:p-6 rounded-full"
          >
            Začnite ustvarjati brezplačno
          </Button>
        </Link>
      </div>
    </div>
  );
};
