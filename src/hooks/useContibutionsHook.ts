import { getContributions } from "@/app/api";
import { ContributionCalendar } from "@/utils/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useContibutions = (username: string) => {
  const [contributionData, setContributionData] =
    useState<ContributionCalendar | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContributions = async () => {
    try {
      const contributions = await getContributions(username);
      if (!contributions) {
        toast.error("No contributions found for this user");
      } else {
        setContributionData(contributions);
      }
    } catch {
      toast.error("Failed to fetch contributions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchContributions();
    }
  }, [username, fetchContributions]);

  return { contributionData, isLoading };
};
