// Import necessary modules and components
import Sidebar from "@/components/sidebar";
import Navbar from "../../components/navbar";
import { getApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

// Define the DashboardLayout component
const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  // Fetch the API limit count and check the user's subscription status
  const apiLimitCount = await getApiLimit();
  const isPro = await checkSubscription();

  return (
    <div className="h-screen">
      {/* Hidden sidebar for larger screens */}
      <div className="hidden bg-[#f4f4f6] dark:bg-[#060e0e] h-full md:flex md:w-[360px] md:flex-col md:fixed md:inset-y-0 ">
        {/* Render the Sidebar component with the user's subscription status and API limit count */}
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>

      {/* Main content area */}
      <main className="md:pl-[360px] bg-[#f4f4f6] dark:bg-[#060e0e] h-full">
        {/* Render the Navbar component with the user's subscription status */}
        <Navbar isPro={isPro} />
        {/* Render the children components inside the main content area */}
        {children}
      </main>
    </div>
  );
};

// Export the DashboardLayout component as the default export
export default DashboardLayout;
