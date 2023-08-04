// Import necessary modules and components
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

// Interface to define prop types for the Heading component
interface HeadingProps {
  title: string; // Title for the heading
  description: string; // Description for the heading
  icon: LucideIcon; // Icon for the heading
  iconColor?: string; // Optional color for the icon
  bgColor?: string; // Optional background color for the icon container
}

const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
}: HeadingProps) => {
  return (
    <>
      {/* Container div for the heading */}
      <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
        {/* Icon container with optional background color */}
        <div className={cn("p-2 w-fit rounded-md", bgColor)}>
          {/* Icon component with optional color */}
          <Icon className={cn("w-10 h-10", iconColor)} />
        </div>
        <div>
          {/* Heading title */}
          <h2 className="text-3xl text-white font-bold">{title}</h2>
          {/* Heading description */}
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </>
  );
};

// Export the Heading component as the default export
export default Heading;
