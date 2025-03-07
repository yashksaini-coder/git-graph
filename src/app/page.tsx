'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner"
import { Input } from "@/components/ui/input";
import { getContributions } from '@/app/api';
import Link from 'next/link';

export default function Home() { 
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [contributionData, setContributionData] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!name.trim()) {
      toast.error("Please enter your name", {
        duration: 3000,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const contributions = await getContributions(name);
      setContributionData(contributions);
      console.log(contributions);
      
      if (!contributions || contributions.length === 0) {
        toast.error("No contributions found for this user", {
          duration: 3000,
        });
      } else {
        toast.success("Contribution data fetched successfully!", {
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('Error fetching contributions:', error);
      toast.error("Failed to fetch contribution data. Please check the username and try again.", {
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if(contributionData) {
    return (
      <main className="flex flex-col items-center justify-center flex-1 w-full px-6 py-12">
        <div className="w-full max-w-lg space-y-8 p-6 sm:p-8 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Coming Soon!
            </h1>
            <p className="text-gray-400 text-center mt-4 max-w-md">
              Contribute to the 
              <span className='mr-2 ml-2 font-semibold text-blue-500 hover:text-white hover:bg-blue-500'>
                <Link href="https://github.com/yashksaini-coder/git-graph">
                  project
                </Link>
              </span>
               to unlock this feature.
            </p>
          </div>
        </div>
      </main>
    ); 
  }

  return(
    <main className="flex flex-col items-center justify-center flex-1 w-full px-4 py-12">
      <div className="w-full max-w-lg space-y-8 p-6 sm:p-8 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Git Graph
          </h1>
          <p className="text-gray-400 text-center mt-4 max-w-md">
            Generate your GitHub contribution graph and share them on your socials.
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
            disabled={isSubmitting}
            variant="default"
            className="w-full hover:bg-violet-700 text-white transition-all duration-200 rounded-md py-2 font-medium shadow-md bg-gradient-to-r from-violet-600 to-indigo-600"
          >
            {isSubmitting ? "Processing..." : "Generate Graph"}
          </Button>
        </form>
      </div>
    </main>
  )
}
