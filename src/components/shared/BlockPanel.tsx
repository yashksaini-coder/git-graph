"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function BlockPanel({
  blockMargin,
  setBlockMargin,
  blockRadius,
  setBlockRadius,
  blockSize,
  setBlockSize,
}: {
  blockMargin: number;
  setBlockMargin: (value: number) => void;
  blockRadius: number;
  setBlockRadius: (value: number) => void;
  blockSize: number;
  setBlockSize: (value: number) => void;
}) {
  return (
    <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 text-white px-4 py-8 rounded-2xl shadow-md w-full h-fit max-w-md gap-4 mt-2">
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {/* Block Margin */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">Block Margin</span>
            <input
              type="number"
              value={blockMargin}
              onChange={(e) => setBlockMargin(Number(e.target.value))}
              className="w-16 bg-gray-800 text-white text-center rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Block Radius */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">Block Radius</span>
            <input
              type="number"
              value={blockRadius}
              onChange={(e) => setBlockRadius(Number(e.target.value))}
              className="w-16 bg-gray-800 text-white text-center rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Block Size */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">Block Size</span>
            <input
              type="number"
              value={blockSize}
              onChange={(e) => setBlockSize(Number(e.target.value))}
              className="w-16 bg-gray-800 text-white text-center rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Reset Button */}
        <Button
          onClick={() => {
            setBlockMargin(4);
            setBlockRadius(2);
            setBlockSize(12);
          }}
          className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md cursor-pointer"
        >
          Reset to Default
        </Button>
      </CardContent>
    </Card>
  );
}