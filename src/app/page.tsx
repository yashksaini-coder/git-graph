"use client";

import React, { Suspense, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "@/components/loader";

// Component that uses useSearchParams
function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const usernameFromUrl = searchParams?.get("username") || "";
  
  const [name, setName] = useState(usernameFromUrl);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchContributions = useCallback(async (username: string) => {
    setIsSubmitting(true);

    if (!username.trim()) {
      toast.error("Please enter your name", {
        duration: 3000,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Redirect to the dynamic user route
      router.push(`/user/${username}`);
    } catch {
      toast.error(
        "An error occurred. Please try again.",
        { duration: 3000 }
      );
      setIsSubmitting(false);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchContributions(name);
  };

  return (
    <main className="flex flex-col items-center justify-center flex-1 w-full px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg space-y-6 sm:space-y-8 p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-md sm:shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="flex flex-col items-center">
          <h1 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-4">GitHub Graph Generator</h1>
          <p className="text-gray-400 text-sm sm:text-base text-center mt-2 max-w-md">
            Generate your GitHub contribution graph and share them on your
            socials.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="card-container bg-gray-800/70 p-2 sm:p-3 md:p-4 rounded-md sm:rounded-lg border border-gray-700">
            <Input
              id="name"
              type="text"
              placeholder="Enter your username..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 text-sm sm:text-base h-9 sm:h-10"
              aria-label="GitHub username"
            />
          </div>

          <Button
            type="submit"
            variant="default"
            className="w-full h-9 sm:h-10 hover:bg-violet-700 text-white transition-all duration-200 rounded-md py-1 sm:py-2 font-medium text-sm sm:text-base shadow-md bg-gradient-to-r from-violet-600 to-indigo-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Generating graph" : "Generate Graph"}
          </Button>
        </form>
      </div>
    </main>
  );
}

// Main home page component with Suspense
export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto my-10 sm:my-16 md:my-20 px-2 py-4 sm:py-8 flex items-center justify-center min-h-[40vh] sm:min-h-[50vh]">
        <div className="animate-fade-in relative w-full max-w-sm sm:max-w-md md:max-w-lg h-32 sm:h-40 flex flex-col items-center justify-center">
          <Loader />
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
