import Sidebar from "@/components/sidebar";
import Navbar from "../../components/navbar";
import { getApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimit();
  const isPro = await checkSubscription();

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-[360px] md:flex-col md:fixed md:inset-y-0 ">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>
      <main className="md:pl-[360px] bg-[#060e0e] h-fit lg:h-full">
        <Navbar isPro={isPro} />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
