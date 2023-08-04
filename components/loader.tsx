// Import necessary module
import Image from "next/image";

// Loader component definition
export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      {/* Animated logo */}
      <div className="w-10 h-10 relative animate-bounce">
        <Image alt="logo" fill src="/logo1.png" />
      </div>
      {/* Loading text */}
      <p className="text-sm text-muted-foreground">Razmišljam...</p>
    </div>
  );
};
