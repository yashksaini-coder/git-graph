"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { getContributions } from "@/app/api/index";
import { ContributionCalendar } from "@/utils/types";
import { parseContributionData } from "@/lib/parse";
import { toPng } from "html-to-image";
import { ActivityCalendar } from "react-activity-calendar";
import { DefaultTheme } from "@/lib/themes";
import { Loader } from "@/components/loader";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const usernameFromUrl = searchParams.get("username") || "";
  
  const [name, setName] = useState(usernameFromUrl);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [theme] = useState(DefaultTheme);
  const [contributionData, setContributionData] =
    useState<ContributionCalendar>();
  const downloadDivRef = useRef<HTMLDivElement>(null);

  // Update input field when URL changes
  useEffect(() => {
    if (usernameFromUrl) {
      setName(usernameFromUrl);
      if (!contributionData && usernameFromUrl) {
        fetchContributions(usernameFromUrl);
      }
    }
  }, [usernameFromUrl]);

  const handleDownload = useCallback(() => {
    if (downloadDivRef.current) {
      toPng(downloadDivRef.current, { cacheBust: true })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `${name}-contribution-graph.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [downloadDivRef, name]);

  const fetchContributions = async (username: string) => {
    setIsSubmitting(true);

    if (!username.trim()) {
      toast.error("Please enter your name", {
        duration: 3000,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Update URL to include username parameter
      router.push(`?username=${username}`);
      
      // Set minimum loading time (1.5 seconds)
      const startTime = Date.now();
      const minLoadingTime = 5000; // 5 seconds
      
      const contributions = await getContributions(username);
      
      // Ensure loader displays for at least minLoadingTime
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < minLoadingTime) {
        await new Promise(resolve => setTimeout(resolve, minLoadingTime - elapsedTime));
      }
      
      if (!contributions) {
        toast.error("No contributions found for this user", {
          duration: 3000,
        });
      } else {
        setContributionData(contributions);
        toast.success("Contribution data fetched successfully!", {
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error fetching contributions:", error);
      toast.error(
        "Failed to fetch contribution data. Please check the username and try again.",
        {
          duration: 3000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchContributions(name);
  };

  if (isSubmitting) {
    return (
      <div className="container mx-auto my-20 px-2 py-8 flex items-center justify-center min-h-[50vh]">
        <div className="relative w-full max-w-lg h-40 flex flex-col items-center justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (contributionData) {
    return (
      <div className="container mx-auto my-16 px-2 py-8">
        <div className="flex flex-col items-center justify-center">
          <div
            ref={downloadDivRef}
            className="relative w-full max-w-4xl space-y-8 p-4 sm:p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl transition-all duration-300 hover:shadow-2xl"
          >
            <div className="flex flex-col items-center">
              <h1 className="text-2xl md:text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
                {name}'s Contribution Graph
              </h1>
              <div className="w-full overflow-x-auto">
                <div className="min-w-full pb-2">
                  <ActivityCalendar
                    data={parseContributionData(contributionData)}
                    fontSize={12}
                    blockSize={12}
                    blockMargin={4}
                    theme={theme}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between z-50 relative mt-6 gap-4">
            <Button
              onClick={() => setContributionData(undefined)}
              className="bg-gray-700 hover:bg-gray-600 text-white cursor-pointer"
            >
              Search Another User
            </Button>
            <Button
              onClick={handleDownload}
              className="bg-gray-700 hover:bg-gray-600 text-white cursor-pointer"
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center flex-1 w-full px-4 py-6">
      <div className="w-full max-w-lg space-y-8 p-6 sm:p-8 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="flex flex-col items-center">
          <p className="text-gray-400 text-center mt-4 max-w-md">
            Generate your GitHub contribution graph and share them on your
            socials.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="card-container bg-gray-800/70 p-3 sm:p-4 rounded-lg border border-gray-700">
            <Input
              id="name"
              type="text"
              placeholder="Enter your username..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 text-sm sm:text-base"
              aria-label="GitHub username"
            />
          </div>

          <Button
            type="submit"
            variant="default"
            className="w-full hover:bg-violet-700 text-white transition-all duration-200 rounded-md py-2 font-medium shadow-md bg-gradient-to-r from-violet-600 to-indigo-600"
          >
            Generate Graph
          </Button>
        </form>
      </div>
    </main>
  );
}