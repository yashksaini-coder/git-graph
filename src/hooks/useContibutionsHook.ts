import { useEffect, useState, useCallback } from "react";
import { getContributions } from "@/app/api";
import { ContributionCalendar } from "@/utils/types";
import { toast } from "sonner";

export const useContibutions = (username: string) => {
  const [contributionData, setContributionData] =
    useState<ContributionCalendar | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContributions = useCallback(async () => {
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
  }, [username]);

  useEffect(() => {
    if (username) {
      fetchContributions();
    }
  }, [username, fetchContributions]);

  return { contributionData, isLoading };
};
