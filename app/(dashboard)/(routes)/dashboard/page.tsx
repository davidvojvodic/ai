"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Camera,
  Code,
  Code2,
  Film,
  ImageIcon,
  MessageSquare,
  MessagesSquare,
  Music,
  VideoIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import TypewriterComponent from "typewriter-effect";

const tools = [
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
  },
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
  },
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
];

export default function DashboardPage() {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 px-10 space-y-4">
        <h2 className="text-2xl text-white md:text-4xl font-bold">
          Raziščite moč umetne inteligence
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg">
          Klepetajte z najpametnejšim AI - Izkusite moč AI
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center px-4 md:px-10 lg:px-10 gap-6">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 w-72 h-[300px] border-2 border-[#2f3838] bg-[#1a1f1f] text-white flex flex-col items-start hover:shadow-[7px_7px_0px_0px_#2f3838] transition duration-300 ease-in-out cursor-pointer"
          >
            <div className="flex items-center justify-between w-full gap-x-4">
              <div className="flex items-center">
                <div
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
            <div className="text-transparent text-xl mt-4 h-[100px] bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
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
