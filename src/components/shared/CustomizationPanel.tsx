"use client";

import { useState, useEffect } from "react";
import { DefaultTheme, DarkTheme, LightTheme, ColorfulTheme } from "@/lib/themes";
import { ThemeInput } from "react-activity-calendar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const themes: { [key: string]: ThemeInput } = {
  Default: DefaultTheme,
  Dark: DarkTheme,
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
    <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 text-white p-4 rounded-2xl shadow-md w-full max-w-md gap-4">
      <CardHeader className="text-white text-lg font-semibold">🎨 Themes</CardHeader>

      <CardContent className="space-y-2 mt-2">
        {Object.keys(themes).map((themeName) => (
          <button
            key={themeName}
            onClick={() => handleThemeChange(themeName)}
            className={`flex justify-between items-center px-3 py-2 rounded-md w-full text-sm font-medium transition-all cursor-pointer ${
              selectedTheme === themeName
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {themeName}
            <span
              className="w-5 h-5 rounded-full border border-gray-500"
              style={{ backgroundColor: themes[themeName]?.light?.[0] || "transparent" }}
            />
          </button>
        ))}

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
