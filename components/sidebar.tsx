"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  MessageSquare,
  ImageIcon,
  VideoIcon,
  Music,
  Code,
  Settings,
  Home,
  MessagesSquare,
  Camera,
  Film,
  Code2,
} from "lucide-react";
import { FreeCounter } from "./free-counter";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Nadzorna plošča",
    icon: Home,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Pogovor",
    icon: MessagesSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Ustvarjanje slik",
    icon: Camera,
    href: "/image",
    color: "text-pink-700",
  },
  {
    label: "Ustvarjanje videa",
    icon: Film,
    href: "/video",
    color: "text-orange-700",
  },
  {
    label: "Ustvarjanje glasbe",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
  },
  {
    label: "Ustvarjanje kode",
    icon: Code2,
    href: "/code",
    color: "text-green-700",
  },
  {
    label: "Nastavitve",
    icon: Settings,
    href: "/settings",
  },
];

interface SidebarProps {
  apiLimitCount?: number;
  isPro: boolean;
}

const Sidebar = ({ apiLimitCount = 0, isPro = false }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 p-3 xl:p-5 border-r-2 rounded-r-3xl border-[#2f3838] flex flex-col h-full bg-[#1a1f1f] text-white">
      <div className="px-3 py-2 mt-5 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-7 h-7 lg:w-10 lg:h-10 mr-4">
            <Image fill alt="logo" src="/logo1.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            AI Platform
          </h1>
        </Link>
        <div className="space-y-2 lg:space-y-4">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm lg:text-md group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "bg-white/10 text-[#36bcba]"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon
                  className={cn(
                    "h-4 w-4 2xl:w-7 2xl:h-7 mr-3 group-hover:animate-pulse duration-700",
                    pathname === route.href ? "text-[#36bcba]" : route.color
                  )}
                />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount} />
    </div>
  );
};

export default Sidebar;
