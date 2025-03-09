"use client";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useContibutions } from "@/hooks/useContibutionsHook";
import { parseContributionData } from "@/lib/parse";
import { DefaultTheme } from "@/lib/themes";
import { toPng } from "html-to-image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useCallback, useRef } from "react";
import ActivityCalendar from "react-activity-calendar";
import { toast } from "sonner";

export default function Username() {
  const { username } = useParams();
  const downloadDivRef = useRef<HTMLDivElement>(null);
  const theme = DefaultTheme;

  console.log("rendering username page");
  
  const { contributionData, isLoading } = useContibutions(username as string);

  const handleDownload = useCallback(() => {
    if (!downloadDivRef.current || !username) return;

    toPng(downloadDivRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${username}-contribution-graph.png`;
        link.href = dataUrl;
        link.click();
        toast.success("Image downloaded successfully");
      })
      .catch(() => toast.error("Failed to download the image"));
  }, [username]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader isActive />
      </div>
    );
  }

  if (!contributionData) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        No contribution data found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center">
        <div
          ref={downloadDivRef}
          className="relative w-full max-w-4xl space-y-8 p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl hover:shadow-2xl"
        >
          <h1 className="text-2xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
            Data Fetched!
          </h1>
          <div className="w-full overflow-x-auto">
            <ActivityCalendar
              data={parseContributionData(contributionData)}
              fontSize={12}
              blockSize={12}
              blockMargin={4}
              theme={theme}
            />
          </div>
        </div>
        <div className="relative z-50 flex items-center justify-between mt-6 gap-4">
          <Link href="/">
            <Button className="bg-gray-700 hover:bg-gray-600 text-white">
              Search Another User
            </Button>
          </Link>
          <Button
            onClick={handleDownload}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}
