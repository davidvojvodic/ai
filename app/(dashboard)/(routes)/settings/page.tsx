import Heading from "@/components/heading";
import { SubButton } from "@/components/sub-button";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div>
      <Heading
        title="Nastavitve"
        description="Upravljajte nastavitve računa"
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro ? "Trenutno imate PRO plan" : "Trenutno imate brezplačni plan"}
        </div>
        <SubButton isPro={isPro} />
      </div>
    </div>
  );
};

export default SettingsPage;
