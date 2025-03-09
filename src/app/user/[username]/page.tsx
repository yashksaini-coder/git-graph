"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getContributions } from "@/app/api/index";
import { ContributionCalendar } from "@/utils/types";
import { parseContributionData } from "@/lib/parse";
import { toPng } from "html-to-image";
import { ActivityCalendar } from "react-activity-calendar";
import { DefaultTheme } from "@/lib/themes";
import { Loader } from "@/components/loader";
import { useRouter, useParams } from "next/navigation";
import React, { Suspense } from "react";

// Component that uses router and handles contribution data
function UserContributionContent({ username }: { username: string }) {
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [theme] = useState(DefaultTheme);
  const [contributionData, setContributionData] = useState<ContributionCalendar | null>(null);
  const downloadDivRef = useRef<HTMLDivElement>(null);
  const dataFetchedRef = useRef(false);

  const handleDownload = useCallback(async () => {
    if (downloadDivRef.current === null) return;
    
    toast.promise(
      async () => {
        const dataUrl = await toPng(downloadDivRef.current!);
        const link = document.createElement('a');
        link.download = `${username}-github-contributions.png`;
        link.href = dataUrl;
        link.click();
      },
      {
        loading: 'Generating image...',
        success: 'Image downloaded successfully!',
        error: 'Failed to download image'
      }
    );
  }, [username]);

  // Navigate back to home
  const handleBackToSearch = useCallback(() => {
    router.push('/');
  }, [router]);

  useEffect(() => {
    // Prevent duplicate fetches on route changes
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      
      try {
        const startTime = Date.now();
        const minLoadingTime = 5000; // Reduced minimum loading time for better UX
        
        const contributions = await getContributions(username);
        
        // Ensure loader displays for at least minLoadingTime
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < minLoadingTime) {
          await new Promise(resolve => setTimeout(resolve, minLoadingTime - elapsedTime));
        }
        
        if (!contributions) {
          setIsError(true);
          toast.error("No contributions found for this user", {
            duration: 3000,
          });
        } else {
          setContributionData(contributions);
        }
      } catch {
        setIsError(true);
        toast.error(
          "Failed to fetch contribution data. Please check the username and try again.",
          { duration: 3000 }
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  // Handle error state
  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isError, router]);

  if (isLoading) {
    return (
      <div className="container mx-auto my-20 px-2 py-8 flex items-center justify-center min-h-[50vh]">
        <div className="animate-fade-in relative w-full max-w-lg h-40 flex flex-col items-center justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (isError || !contributionData) {
    return (
      <div className="container mx-auto my-20 px-2 py-8 flex items-center justify-center min-h-[50vh]">
        <div className="animate-fade-in relative w-full max-w-lg flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold text-red-400 mb-4">Failed to load data</h2>
          <p className="text-gray-400 mb-6">Redirecting to search page...</p>
          <Button 
            onClick={handleBackToSearch}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            Return to Search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-16 px-2 py-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center">
        <div
          ref={downloadDivRef}
          className="relative w-full max-w-4xl space-y-8 p-4 sm:p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl transition-all duration-300 hover:shadow-2xl"
        >
          <div className="flex flex-col items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
              {username}&apos;s Contribution Graph
            </h1>
            <div className="w-full overflow-x-auto">
              <div className="min-w-full pb-2">
                <ActivityCalendar
                  data={parseContributionData(contributionData)}
                  fontSize={12}
                  blockSize={12}
                  blockMargin={4}
                  theme={theme}
                  labels={{
                    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    totalCount: '{{count}} contributions in the last year',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between z-50 relative mt-6 gap-4">
          <Button
            onClick={handleBackToSearch}
            className="bg-gray-700 hover:bg-gray-600 text-white cursor-pointer transition-colors duration-200"
          >
            Search Another User
          </Button>
          <Button
            onClick={handleDownload}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white cursor-pointer transition-all duration-200"
          >
            Download Graph
          </Button>
        </div>
      </div>
    </div>
  );
}

// Main page component
export default function UserPage() {
  const params = useParams();
  const username = params?.username as string || '';
  
  return (
    <Suspense fallback={
      <div className="container mx-auto my-20 px-2 py-8 flex items-center justify-center min-h-[50vh]">
        <div className="animate-fade-in relative w-full max-w-lg h-40 flex flex-col items-center justify-center">
          <Loader />
        </div>
      </div>
    }>
      <UserContributionContent username={username} />
    </Suspense>
  );
}
