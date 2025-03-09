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
