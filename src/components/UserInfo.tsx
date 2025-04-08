"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
import { Users } from "lucide-react";
import { getProfile } from "@/app/api";
import { UserProfileType } from "@/utils/types";
import { toast } from "sonner";
import {
  RepoIcon,
  IssueOpenedIcon,
  GitPullRequestIcon,
} from "@primer/octicons-react";

interface UserInfoProps {
  username?: string;
}

export default function UserInfo({ username }: UserInfoProps) {
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      // if (!showProfile) return;
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
  }, [username]);

  return (
    <AnimatePresence>
      {username && (
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
                    <div className="flex justify-between">
                      <h1 className="text-2xl font-bold text-white">
                        {typeof profile.name === "string"
                          ? profile.name
                          : "User"}
                      </h1>
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        {/* <GitCommit className="w-4 h-4" /> */}
                        <RepoIcon size={15} />
                        <span>
                          {profile.repositories.totalCount} Repositories
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between h-20px">
                      <p className="text-gray-400">
                        @
                        {typeof profile.name === "string"
                          ? profile.name
                          : username}
                      </p>
                      <div className="flex text-sm text-gray-400 justify-center items-center gap-1 w-20% text-sm">
                        <div className="flex items-center gap-1 pr-5">
                          <IssueOpenedIcon size={15} />
                          <div className="flex item-center gap-1">
                            {profile.issues.totalCount}
                            <div>Issues</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitPullRequestIcon size={15} />
                          <div className="flex flex item-center gap-1">
                            {profile.pullRequests.totalCount}
                            <div>Pull Request</div>
                          </div>
                        </div>
                      </div>
                    </div>
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
