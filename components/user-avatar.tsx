import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  classname?: string,
  imageUrl: string
}

const UserAvatar = ({
  classname,
  imageUrl
}: UserAvatarProps) => {
  return (
    <Avatar className={cn(
      "w-7 h-7 md:w-10 md:h-10",
      classname
    )}>
      <AvatarImage src={imageUrl} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;