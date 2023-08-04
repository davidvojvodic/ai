// Import necessary modules
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// UserAvatar component definition
export const UserAvatar = () => {
  // Get the current user from the useUser hook provided by Clerk
  const { user } = useUser();

  return (
    // Avatar component displaying user's avatar or fallback initials
    <Avatar className="w-8 h-8">
      {/* Display the user's avatar image if available */}
      <AvatarImage src={user?.profileImageUrl} />
      {/* Display fallback initials (first letter of first name and last name) if avatar image is not available */}
      <AvatarFallback>
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};
