"use client";

import { useState, useEffect } from "react";
import { DefaultTheme, LightTheme, ColorfulTheme } from "@/lib/themes";
import { ThemeInput } from "react-activity-calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const themes: { [key: string]: ThemeInput } = {
  Default: DefaultTheme,
  Light: LightTheme,
  Colorful: ColorfulTheme,
};

export default function CustomizationPanel({ setTheme }: { setTheme: (theme: ThemeInput) => void }) {
  const [selectedTheme, setSelectedTheme] = useState<string>("Default");

  useEffect(() => {
    const storedTheme = localStorage.getItem("selectedTheme");
    if (storedTheme && themes[storedTheme]) {
      setSelectedTheme(storedTheme);
      setTheme(themes[storedTheme]);
    }
  }, [setTheme]);

  const handleThemeChange = (themeName: string) => {
    setSelectedTheme(themeName);
    setTheme(themes[themeName]);
    localStorage.setItem("selectedTheme", themeName);
  };

  return (
    <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 text-white px-4 py-8 rounded-2xl shadow-md w-full h-fit max-w-md gap-4">
      <CardContent className="space-y-4 mt-2">
        <div className="space-y-3">
          {Object.keys(themes).map((themeName) => (
            <div key={themeName} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full border border-gray-500"
                  style={{
                    backgroundColor: themes[themeName]?.light?.[0] || "transparent",
                  }}
                ></span>
                <span className="text-sm font-medium text-gray-300">{themeName}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value={themeName}
                  checked={selectedTheme === themeName}
                  onChange={() => handleThemeChange(themeName)}
                  className="sr-only peer"
                />
                <div
                  className={`w-11 h-6 bg-gray-700 rounded-full transition-colors duration-300 peer-checked:bg-blue-500`}
                ></div>
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md absolute top-0.5 left-0.5 transition-transform duration-300 peer-checked:translate-x-5`}
                ></div>
              </label>
            </div>
          ))}
        </div>

        <Button
          onClick={() => handleThemeChange("Default")}
          className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md cursor-pointer"
        >
          Reset to Default
        </Button>
      </CardContent>
    </Card>
  );
}
