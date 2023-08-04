// Import necessary modules
import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";
import { getApiLimit } from "@/lib/api-limit";

// Interface for NavbarProps
interface NavbarProps {
  isPro: boolean;
}

// Navbar component definition
const Navbar = async ({ isPro = false }: NavbarProps) => {
  // Fetch the API limit count asynchronously
  const apiLimitCount = await getApiLimit();

  return (
    <div className="flex bg-[#060e0e] items-center p-4">
      {/* MobileSidebar component with isPro and apiLimitCount props */}
      <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />

      <div className="flex w-full justify-end">
        {/* UserButton component from Clerk for user authentication */}
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
