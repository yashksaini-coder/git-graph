'use client';

import { useState } from 'react';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [name, setName] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center">
        Git Graph
      </h1>
      <p className="text-gray-400 text-center mt-4 max-w-lg">
        Generate your GitHub contribution graph and share them on your socials.
      </p>

      <div className="mt-6 flex gap-2 w-full justify-content max-w-md">
        <input
          type="text"
          placeholder="Type your name ..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none"
        />
        <Button className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md transition">
          Submit
        </Button>
      </div>

      {/* <div className="mt-6 flex gap-4">
        <Button  variant="outline" className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition">
          Get Started
        </Button>
        <Button variant="outline" className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition">
          <a href="https://github.com/yashksaini-coder/git-graph" target="_blank">
            <Github className="text-xl" /> Github
          </a>
        </Button>
      </div> */}
    </div>
  );
}
