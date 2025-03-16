"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
import { Users, GitCommit } from "lucide-react";
import { getProfile } from "@/app/api";
import { UserProfileType } from "@/utils/types";
import { toast } from "sonner";

interface UserInfoProps {
  username?: string;
  showProfile: boolean;
}

export default function UserInfo({ username, showProfile }: UserInfoProps) {
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!showProfile) return;
      // setIsLoading(true);

      try {
        const response = await getProfile(username!);
        if (response) {
          setProfile(response);
        } else {
          toast.error("Failed to load profile data");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data");
      } finally {
        // setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [username, showProfile]);

  return (
    <AnimatePresence>
      {showProfile && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Card className="border-none shadow-none">
            {profile ? (
              <div className="flex flex-col md:flex-row gap-6">
                <Avatar className="w-24 h-24 rounded-full border-2 border-[#30363d]">
                  <AvatarImage
                    src={profile.avatarUrl || "/placeholder.svg"}
                    alt={
                      typeof profile.name === "string" ? profile.name : "User"
                    }
                    className="object-cover"
                  />
                  <AvatarFallback>
                    <Users className="w-12 h-12" />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2 flex-1">
                  <div>
                    <h1 className="text-2xl font-bold text-white">
                      {typeof profile.name === "string" ? profile.name : "User"}
                    </h1>
                    <p className="text-gray-400">
                      @
                      {typeof profile.name === "string"
                        ? profile.name
                        : username}
                    </p>
                  </div>
                  <p className="text-gray-200">
                    {typeof profile.bio === "string"
                      ? profile.bio
                      : "No bio available"}
                  </p>
                  <div className="flex items-center gap-6 text-gray-400">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{profile.followers.totalCount} Followers</span>
                      <span className="mx-1">•</span>
                      <span>
                        {profile.following.totalCount}
                        {""} Following
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-gray-400">
                    <div className="flex items-center gap-1">
                      <GitCommit className="w-4 h-4" />
                      <span>
                        {profile.repositories.totalCount} Repositories
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                No profile data available
              </div>
            )}
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
