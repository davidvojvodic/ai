import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";
import { getApiLimit } from "@/lib/api-limit";
import { boolean } from "zod";

interface NavbarProps {
  isPro: boolean;
}

const Navbar = async ({ isPro = false }: NavbarProps) => {
  const apiLimitCount = await getApiLimit();

  return (
    <div className="flex bg-[#060e0e] items-center p-4">
      <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
