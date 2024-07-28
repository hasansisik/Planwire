// components/ui/avatar-group.tsx
import React from "react";
import Image from "next/image";

interface AvatarGroupProps {
  avatars: string[];
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ avatars }) => {
  const visibleAvatars = avatars.slice(0, 3);
  const additionalCount = avatars.length - visibleAvatars.length;

  return (
    <div className="flex -space-x-4">
      {visibleAvatars.map((avatar, index) => (
        <Image
          key={index}
          src={avatar}
          alt={`Avatar ${index + 1}`}
          width={40}
          height={40}
          style={{ borderRadius: "50%" }}
          className="border-2 border-white"
        />
      ))}
      {additionalCount > 0 && (
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-700 border-2 border-white">
          +{additionalCount}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
