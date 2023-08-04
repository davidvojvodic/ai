// Import the necessary modules and components
import Image from "next/image";
import React from "react";

// Interface to define prop types for the Empty component
interface EmptyProps {
  label: string; // The text to be displayed below the image
  img: string;
}

// Empty component that displays an image and label when there is no content to show
const Empty = ({ label, img }: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      {/* Container for the image */}
      <div className="relative h-72 w-72">
        {/* The Image component from Next.js used to display the image */}
        <Image alt="Empty" fill src={img} />
      </div>
      {/* Label to indicate that there is no content to show */}
      <p className="text-white">{label}</p>
    </div>
  );
};

export default Empty;
