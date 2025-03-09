"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";
import { checkUsernameExists } from "@/app/api/index";

export default function Home() {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [theme] = useState(DefaultTheme);
  const [contributionData, setContributionData] =
    useState<ContributionCalendar>();
  const downloadDivRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback((username: string) => () => {
    if (downloadDivRef.current) {
      toPng(downloadDivRef.current, { cacheBust: true })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `${username}-contribution-graph.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [downloadDivRef]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter a valid username", { duration: 3000 });
      return;
    }

    setIsSubmitting(true);

    try {
      const userExists = await checkUsernameExists(name);
      if (!userExists) {
        toast.error("Username does not exist. Please check the username.", {
          duration: 3000,
        });
        setIsSubmitting(false);
        return;
      }

      router.push(`/username/${name}`);
    } catch (error) {
      console.error("Error fetching contributions:", error);
      toast.error("Failed to fetch data. Please try again.", {
        duration: 3000,
      });
      setIsSubmitting(false);
    }
  };

  if (contributionData) {
    return (
      <div className="container mx-auto px-2 py-8">
        <div className="flex flex-col items-center justify-center">
          <div
            ref={downloadDivRef}
            className="relative w-full max-w-4xl space-y-8 p-4 sm:p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl transition-all duration-300 hover:shadow-2xl"
          >
            <div className="flex flex-col items-center">
              <h1 className="text-2xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
                Data Fetched!
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
              onClick={handleDownload(name)}
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
    <main className="flex flex-col items-center justify-center h-screen px-4 py-6">
      <div className="w-full max-w-lg space-y-6 p-6 sm:p-8 rounded-xl bg-gray-900/50 backdrop-blur-md border border-gray-800 shadow-lg">
        <h1 className="text-center text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          GitHub Contribution Graph Generator
        </h1>
        <p className="text-gray-400 text-center">
          Enter your GitHub username to generate your contribution graph.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-gray-800/70 p-3 sm:p-4 rounded-lg border border-gray-700">
            <Input
              type="text"
              placeholder="Enter your GitHub username..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 text-sm sm:text-base"
              aria-label="GitHub username"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full hover:bg-violet-700 text-white transition-all duration-200 rounded-md py-2 font-medium shadow-md bg-gradient-to-r from-violet-600 to-indigo-600"
          >
            {isSubmitting ? "Validating..." : "Generate Graph"}
          </Button>
        </form>
        {isSubmitting && (
          <div>
            <Loader isActive={isSubmitting} />
          </div>
        )}
      </div>
    </main>
  );
}
