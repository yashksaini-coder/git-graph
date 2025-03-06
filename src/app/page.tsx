'use client';

import { useState } from 'react';
// import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { helloAction } from '@/actions/hello-action';
import { toast } from "sonner"

export default function Home() { 

  const [name, setName] = useState('');
  
  const handleSubmit = async () => {
    const response = await helloAction(name);
    toast(response.message, {
      duration: 5000,
    });
  };

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
        <Button onClick={handleSubmit} type="submit" variant="secondary" className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md transition">
          Submit
        </Button>
      </div>
    </div>
  );
}
