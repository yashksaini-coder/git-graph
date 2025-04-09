"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HidePanel({
  hideColorLegend,
  sethideColorLegend,
  hideMonthLabels,
  sethideMonthLabels,
  hideTotalCount,
  sethideTotalCount,
}: {
  hideColorLegend: boolean;
  sethideColorLegend: (value: boolean) => void;
  hideMonthLabels: boolean;
  sethideMonthLabels: (value: boolean) => void;
  hideTotalCount: boolean;
  sethideTotalCount: (value: boolean) => void;
}) {
  return (
    <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 text-white px-4 py-8 rounded-2xl shadow-md w-full h-fit max-w-md gap-4 mt-2">
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {/* Hide Color Legend */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">
              Hide Color Legend
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={hideColorLegend}
                onChange={(e) => sethideColorLegend(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-blue-500 transition-colors"></div>
              <div className="w-5 h-5 bg-white rounded-full shadow-md absolute top-0.5 left-0.5 peer-checked:translate-x-5 transition-transform"></div>
            </label>
          </div>

          {/* Hide Month Labels */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">
              Hide Month Labels
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={hideMonthLabels}
                onChange={(e) => sethideMonthLabels(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-blue-500 transition-colors"></div>
              <div className="w-5 h-5 bg-white rounded-full shadow-md absolute top-0.5 left-0.5 peer-checked:translate-x-5 transition-transform"></div>
            </label>
          </div>

          {/* Hide Total Count */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">
              Hide Total Count
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={hideTotalCount}
                onChange={(e) => sethideTotalCount(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-blue-500 transition-colors"></div>
              <div className="w-5 h-5 bg-white rounded-full shadow-md absolute top-0.5 left-0.5 peer-checked:translate-x-5 transition-transform"></div>
            </label>
          </div>
        </div>

        {/* Reset Button */}
        <Button
          onClick={() => {
            sethideColorLegend(false);
            sethideMonthLabels(false);
            sethideTotalCount(false);
          }}
          className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md cursor-pointer"
        >
          Reset to Default
        </Button>
      </CardContent>
    </Card>
  );
}