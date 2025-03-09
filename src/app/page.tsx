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
  const usernameFromUrl = searchParams.get("username") || "";
  
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
      <div className="container mx-auto my-20 px-2 py-8 flex items-center justify-center min-h-[50vh]">
        <div className="animate-fade-in relative w-full max-w-lg h-40 flex flex-col items-center justify-center">
          <Loader />
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
