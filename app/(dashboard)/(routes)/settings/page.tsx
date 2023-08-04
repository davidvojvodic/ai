// Import necessary components, icons, and utilities
import Heading from "@/components/heading";
import { SubButton } from "@/components/sub-button";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";

// Define the SettingsPage functional component
const SettingsPage = async () => {
  // Check the user's subscription status asynchronously
  const isPro = await checkSubscription();

  return (
    <div>
      {/* Heading section */}
      <Heading
        title="Nastavitve"
        description="Upravljajte nastavitve računa"
        icon={Settings}
        iconColor="text-[#36bcba]"
        bgColor="bg-white/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        {/* Display the subscription status message */}
        <div className="text-muted-foreground text-sm">
          {isPro ? "Trenutno imate PRO plan" : "Trenutno imate brezplačni plan"}
        </div>
        {/* Render the subscription button component */}
        <SubButton isPro={isPro} />
      </div>
    </div>
  );
};

export default SettingsPage;
