"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FontPanel({
  fontSize,
  setFontSize,
}: {
  fontSize: number;
  setFontSize: (value: number) => void;
}) {
  return (
    <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 text-white px-4 py-8 rounded-2xl shadow-md w-full h-fit max-w-md gap-4 mt-2">
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {/* Font Size */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">Font Size</span>
            <input
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-16 bg-gray-800 text-white text-center rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Reset Button */}
        <Button
          onClick={() => setFontSize(14)} // Reset fontSize to default value
          className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md cursor-pointer"
        >
          Reset to Default
        </Button>
      </CardContent>
    </Card>
  );
}