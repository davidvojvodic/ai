"use client";

// Import necessary components, icons, and utilities
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Camera,
  Code2,
  Film,
  ImageIcon,
  MessagesSquare,
  Music,
} from "lucide-react";
import { useRouter } from "next/navigation";
import TypewriterComponent from "typewriter-effect";

// Data for different tools with their labels, icons, colors, backgrounds, hrefs, and options
const tools = [
  // Tool 1: Pogovor
  {
    label: "Pogovor",
    icon: MessagesSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
    options: [
      "Napiši mi recept za pripravo mesne lazanje.",
      "Napiši mi fitnes program za moškega, ki hodi v fitnes 4x na teden.",
      "Koliko je velika zemlja?",
      "Napiši mi nekaj vicev, ki jih lahko uporabim na naslednjem druženju.",
    ],
  },
  // Tool 2: Ustvarjanje slik
  {
    label: "Ustvarjanje slik",
    icon: Camera,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
    options: [
      "Ustvari sliko sončnega vzhoda nad gozdom.",
      "Oblikuj pokrajino s cvetočim travnikom in metulji.",
      "Izdelaj podobo starega mestnega trga v poletju.",
      "Prikaži sproščujoč prizor ob obali z valovi.",
    ],
  },
  // Tool 5: Ustvarjanje kode
  {
    label: "Ustvarjanje kode",
    icon: Code2,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
    options: [
      "Prikaži vzorec kode za povezavo z bazami podatkov SQL.",
      "Predstavljaj si kodo za ustvarjanje dinamičnega menija na spletni strani. ",
      "Prikaži vzorec kode za animacijo gumbov ob prehodu miške.",
      "Izdelaj skripto, ki omogoča uporabnikom, da ocenjujejo in komentirajo objave.",
    ],
  },
  // Tool 3: Ustvarjanje videa
  {
    label: "Ustvarjanje videa",
    icon: Film,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/video",
    options: [
      "Ustvari video potovanja skozi gosto tropsko džunglo.",
      "Prikaži sekvenco sončnega zahoda nad mirnim oceanom. ",
      "Izdelaj animacijo starega mesta s prebivalci in vozovi. ",
      "Ustvari video množice ptic, ki vzletijo s polja. ",
    ],
    isEnabled: false, // New field to indicate if this tool is enabled
  },
  // Tool 4: Ustvarjanje glasbe
  {
    label: "Ustvarjanje glasbe",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/music",
    options: [
      "Oblikuj zvočno kuliso za sproščujoč večer ob kaminu.",
      "Oblikuj melodijo, ki bi jo lahko igrali na kmečkem praznovanju. ",
      "Izdelaj glasbeni motiv, ki prikliče občutek jadranja po mirnem jezeru. ",
      "Predstavljaj si glasbeno ozadje za hitro vožnjo skozi mesto ponoči.",
    ],
    isEnabled: false, // New field to indicate if this tool is enabled
  },

  {
    label: "Restavriranje slik",
    icon: ImageIcon,
    href: "/image-restoration",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    isEnabled: false, // New field to indicate if this tool is enabled
  },
];

export default function DashboardPage() {
  // Initialize the router
  const router = useRouter();

  return (
    <div className="h-fit bg-[#f4f4f6] dark:bg-[#060e0e] pb-10">
      <div className="mb-8 px-10 space-y-4">
        {/* Heading and description */}
        <h2 className="text-2xl text-black dark:text-white md:text-4xl font-bold">
          Raziščite moč umetne inteligence
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg">
          Klepetajte z najpametnejšim AI - Izkusite moč AI
        </p>
      </div>
      <div className="flex flex-wrap h-full items-center justify-center md:justify-start  px-4 md:px-10 lg:px-10 gap-6">
        {/* Render each tool as a Card */}
        {tools.map((tool) => (
          <Card
            // On click, navigate to the corresponding href
            onClick={(e) => {
              if (tool.isEnabled !== false) {
                router.push(tool.href);
              } else {
                e.preventDefault();
              }
            }}
            key={tool.href}
            className={cn(
              "p-4 w-56 h-[240px] 2xl:w-72 2xl:h-[300px] border-2 border-[#2f3838] bg-white text-black dark:bg-[#1a1f1f] dark:text-white flex flex-col items-start hover:shadow-[7px_7px_0px_0px_#2f3838] transition duration-300 ease-in-out",
              tool.isEnabled === false ? "cursor-not-allowed" : "cursor-pointer"
            )}
          >
            <div className="flex items-center justify-between w-full gap-x-4">
              <div className="flex items-center">
                <div
                  // Icon with its color and background color
                  className={cn(
                    "p-2 flex items-center justify-center rounded-md w-fit",
                    tool.bgColor
                  )}
                >
                  <tool.icon className={cn("w-8 h-8", tool.color)} />
                </div>
                <div className="font-semibold ml-2">{tool.label}</div>
              </div>
              <ArrowRight className="w-8 h-8" />
            </div>
            <div className="mt-3">
              <h1 className="font-semibold">Namigi:</h1>
            </div>
            <div className="text-transparent text-base 2xl:text-xl mt-4 h-[100px] bg-clip-text bg-gradient-to-r from-[#00ffeb] via-[#36bcba] to-[#254cad]">
              {/* Typewriter effect to display options */}
              <TypewriterComponent
                options={{
                  strings: tool.options,
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
