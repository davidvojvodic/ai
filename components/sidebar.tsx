"use client";

// Import necessary modules
import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  Music,
  Settings,
  Home,
  MessagesSquare,
  Camera,
  Film,
  Code2,
  ImageIcon,
} from "lucide-react";
import { FreeCounter } from "./free-counter";

// Define the Montserrat font with specific weight and subsets
const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

// Define the routes array with different options for each route
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
    label: "Ustvarjanje kode",
    icon: Code2,
    href: "/code",
    color: "text-green-700",
  },
  {
    label: "Restavriranje slik",
    icon: ImageIcon,
    href: "/image-restoration",
    color: "text-pink-500",
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
    label: "Nastavitve",
    icon: Settings,
    href: "/settings",
  },
];

// Sidebar component definition
interface SidebarProps {
  apiLimitCount?: number;
  isPro: boolean;
}

const Sidebar = ({ apiLimitCount = 0, isPro = false }: SidebarProps) => {
  const pathname = usePathname();

  return (
    // Sidebar container with navigation links and logo
    <div className="space-y-4 p-3 xl:p-5 border-r-2 rounded-r-3xl border-[#2f3838] flex flex-col h-full bg-[#ffffff] dark:bg-[#1a1f1f] text-[#b2b2b2] dark:text-white">
      <div className="px-3 py-2 mt-5 flex-1">
        {/* Logo and platform name */}
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-7 h-7 lg:w-10 lg:h-10 mr-4">
            <Image fill alt="logo" src="/logo1.png" />
          </div>
          <h1
            className={cn(
              "text-2xl text-black dark:text-white font-bold",
              montserrat.className
            )}
          >
            AI Platform
          </h1>
        </Link>
        <div className="space-y-2 2xl:space-y-4">
          {/* Navigation links */}
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm lg:text-md group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-black dark:hover:text-white hover:bg-[#f3f3fb] dark:hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "bg-[#f3f3fb] dark:bg-white/10 text-[#36bcba]"
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
      {/* FreeCounter component for displaying API usage */}
      <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount} />
    </div>
  );
};

export default Sidebar;
