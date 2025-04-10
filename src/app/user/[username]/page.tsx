"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getContributions } from "@/app/api/index";
import { ContributionCalendar } from "@/utils/types";
import { toPng } from "html-to-image";
import { DefaultTheme, themes } from "@/lib/themes";
import { Loader } from "@/components/loader";
import { useRouter, useParams } from "next/navigation";
import React, { Suspense } from "react";
import ThemesPanel from "@/components/shared/ThemesPanel";
import HidePanel from "@/components/shared/HidePanel";
import UserInfo from "@/components/UserInfo";
import { RiSidebarFoldFill } from "react-icons/ri";
import GitHubCalendar from "react-github-calendar";
import { Download } from "lucide-react";
import ExportPanel from "@/components/ExportPanel";
// import { Switch } from "@radix-ui/react-switch";
import {
  Sheet,
  SheetContent,
  // SheetDescription,
  SheetHeader,
  // SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRight } from "lucide-react";
import { IoColorPaletteOutline } from "react-icons/io5";
import { FaBorderStyle } from "react-icons/fa";
import { MdCenterFocusWeak } from "react-icons/md";
import { AiOutlineFontSize } from "react-icons/ai";
import BlockPanel from "@/components/shared/BlockPanel";
import FontPanel from "@/components/shared/FontPanel";
// import PopoverDemo from "@/components/PopOverSidebar";

// interface SidebarProps {
//   triggerText: string;
//   title: string;
//   description: string;
// }

// Component that uses router and handles contribution data
function UserContributionContent({ username }: { username: string }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [theme, setTheme] = useState(DefaultTheme);
  const [themeName, setThemeName] = useState(
    localStorage.getItem("selectedTheme")
  );
  const [contributionData, setContributionData] =
    useState<ContributionCalendar | null>(null);
  const downloadDivRef = useRef<HTMLDivElement>(null);
  const dataFetchedRef = useRef(false);
  // const [showProfile, setShowProfile] = useState(true);
  const [showCustomization, setShowCustomization] = useState(false);
  const [blockMargin, setBlockMargin] = useState(4);
  const [blockRadius, setBlockRadius] = useState(2);
  const [blockSize, setBlockSize] = useState(12);
  const [showBlockOptions, setshowBlockOptions] = useState(false);
  const [hideColorLegend, sethideColorLegend] = useState(false);
  const [hideMonthLabels, sethideMonthLabels] = useState(false);
  const [hideTotalCount, sethideTotalCount] = useState(false);
  const [showHideOptions, setShowHideOptions] = useState(false);
  const [fontSize, setFontSize] = useState(12);
  const [showFontOptions, setShowFontOptions] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("selectedTheme");
    if (storedTheme && themes[storedTheme]) {
      setTheme(themes[storedTheme]);
    } else {
      setTheme(DefaultTheme);
    }
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("selectedTheme");
    if (storedTheme) {
      setThemeName(storedTheme);
    } else {
      setThemeName("Default");
    }
  }, [theme]);

  const handleDownload = useCallback(async () => {
    if (!downloadDivRef.current) return;

    toast.promise(
      async () => {
        const graphElement = downloadDivRef.current!;
        const originalWidth = graphElement.style.width;
        const originalOverflow = graphElement.style.overflow;
        graphElement.style.width = "1200px";
        graphElement.style.overflow = "visible";

        await new Promise((resolve) => setTimeout(resolve, 300));
        const dataUrl = await toPng(graphElement, {
          backgroundColor: "#1a1a1a",
        });

        graphElement.style.width = originalWidth;
        graphElement.style.overflow = originalOverflow;

        const link = document.createElement("a");
        link.download = `${username}-github-contributions.png`;
        link.href = dataUrl;
        link.click();
      },
      {
        loading: "Generating image...",
        success: "Image downloaded successfully!",
        error: "Failed to download image",
      }
    );
  }, [username]);

  // Navigate back to home
  const handleBackToSearch = useCallback(() => {
    router.push("/");
  }, [router]);

  useEffect(() => {
    // Prevent duplicate fetches on route changes
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const startTime = Date.now();
        const minLoadingTime = 5000; // Reduced minimum loading time for better UX

        const contributions = await getContributions(username);

        // Ensure loader displays for at least minLoadingTime
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < minLoadingTime) {
          await new Promise((resolve) =>
            setTimeout(resolve, minLoadingTime - elapsedTime)
          );
        }

        if (!contributions) {
          setIsError(true);
          toast.error("No contributions found for this user", {
            duration: 3000,
          });
        } else {
          setContributionData(contributions);
        }
      } catch {
        setIsError(true);
        toast.error(
          "Failed to fetch contribution data. Please check the username and try again.",
          { duration: 3000 }
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  // Handle error state
  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isError, router]);

  if (isLoading) {
    return (
      <div className="container mx-auto my-20 px-2 py-8 flex items-center justify-center min-h-[50vh]">
        <div className="animate-fade-in relative w-full max-w-lg h-40 flex flex-col items-center justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (isError || !contributionData) {
    return (
      <div className="container mx-auto my-20 px-2 py-8 flex items-center justify-center min-h-[50vh]">
        <div className="animate-fade-in relative w-full max-w-lg flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold text-red-400 mb-4">
            Failed to load data
          </h2>
          <p className="text-gray-400 mb-6">Redirecting to search page...</p>
          <Button
            onClick={handleBackToSearch}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            Return to Search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-16 px-2 py-8 animate-fade-in flex lg:flex-row-reverse flex-col-reverse lg:flex-nowrap flex-wrap justify-center items-center gap-6 h-fit">
      {/* <CustomizationPanel setTheme={setTheme} /> */}
      <Sheet
        onOpenChange={(open) => {
          if (!open) {
            setShowCustomization(false);
            setshowBlockOptions(false); // Close the BlockPanel when the sheet is closed
            setShowHideOptions(false);
            setShowFontOptions(false); // Close the FontPanel when the sheet is closed
          }
        }}
      >
        <SheetTrigger className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full py-3 px-3 text-2xl shadow-lg z-50 lg:hidden md:hidden">
          <RiSidebarFoldFill className="text-white" />
        </SheetTrigger>
        <SheetContent className="backdrop-blur">
          <SheetHeader className="mt-14 overflow-y-scroll">
            {/* <SheetTitle>{title}</SheetTitle> */}
            <Button
              variant="outline"
              onClick={() => setShowCustomization((prev) => !prev)}
              className="flex justify-between rounded-2xl my-1 hover:bg-[#ffffff25]"
            >
              <div className="flex justify-center items-center">
                <IoColorPaletteOutline className="mr-2" /> Themes
              </div>{" "}
              <ChevronRight
                className={`ml-2 h-5 w-5 ${
                  showCustomization ? "rotate-90" : ""
                }`}
              />
            </Button>
            {showCustomization && <ThemesPanel setTheme={setTheme} />}
            <Button
              variant="outline"
              onClick={() => setshowBlockOptions((prev) => !prev)}
              className="flex justify-between rounded-2xl my-1 hover:bg-[#ffffff25]"
            >
              <div className="flex justify-center items-center">
                <FaBorderStyle className="mr-2" /> Blocks
              </div>{" "}
              <ChevronRight
                className={`ml-2 h-5 w-5 ${
                  showBlockOptions ? "rotate-90" : ""
                }`}
              />
            </Button>
            {showBlockOptions && (
              <BlockPanel
                blockMargin={blockMargin}
                setBlockMargin={setBlockMargin}
                blockRadius={blockRadius}
                setBlockRadius={setBlockRadius}
                blockSize={blockSize}
                setBlockSize={setBlockSize}
              />
            )}
            <Button
              variant="outline"
              onClick={() => setShowHideOptions((prev) => !prev)} // Toggle the state
              className="flex justify-between rounded-2xl my-1 hover:bg-[#ffffff25]"
            >
              <div className="flex justify-center items-center">
                <MdCenterFocusWeak className="mr-2" /> Hide
              </div>{" "}
              <ChevronRight
                className={`ml-2 h-5 w-5 ${
                  showHideOptions ? "rotate-90" : "" // Rotate the icon when open
                }`}
              />
            </Button>
            {showHideOptions && (
              <HidePanel
                hideColorLegend={hideColorLegend}
                sethideColorLegend={sethideColorLegend}
                hideMonthLabels={hideMonthLabels}
                sethideMonthLabels={sethideMonthLabels}
                hideTotalCount={hideTotalCount}
                sethideTotalCount={sethideTotalCount}
              />
            )}
            <Button
              variant="outline"
              onClick={() => setShowFontOptions((prev) => !prev)} // Toggle the state
              className="flex justify-between rounded-2xl my-1 hover:bg-[#ffffff25]"
            >
              <div className="flex justify-center items-center">
                <AiOutlineFontSize className="mr-2" /> Fonts
              </div>{" "}
              <ChevronRight
                className={`ml-2 h-5 w-5 ${
                  showFontOptions ? "rotate-90" : "" // Rotate the icon when open
                }`}
              />
            </Button>
            {showFontOptions && (
              <FontPanel fontSize={fontSize} setFontSize={setFontSize} />
            )}
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <div className="flex flex-col items-center justify-center">
        <div
          ref={downloadDivRef}
          className="relative w-full max-w-4xl space-y-8 p-3 md:p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl transition-all duration-300 hover:shadow-2xl"
        >
          <UserInfo username={username} />
          <div className="flex flex-col items-center justify-center">
            {/* {!username && (
              <h1 className="text-2xl md:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
                {username}&apos;s Contribution Graph
              </h1>
              )
            } */}
            <div className="w-full max-w-[80vw] overflow-x-auto">
              <div className="min-w-full pb-2">
                <GitHubCalendar
                  username={username}
                  blockSize={blockSize}
                  blockMargin={blockMargin}
                  blockRadius={blockRadius}
                  theme={
                    themeName === "Dark" || themeName === "Light"
                      ? undefined
                      : theme
                  }
                  fontSize={fontSize}
                  hideColorLegend={hideColorLegend}
                  hideMonthLabels={hideMonthLabels}
                  hideTotalCount={hideTotalCount}
                  colorScheme={
                    themeName === "Dark"
                      ? "dark"
                      : themeName === "Light"
                      ? "light"
                      : undefined
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between w-full z-50 relative mt-6 gap-4">
          {/* <Switch checked={showProfile} onCheckedChange={setShowProfile} /> */}
          {/* <Button
            onClick={handleBackToSearch}
            className="bg-gray-700 hover:bg-gray-600 text-white cursor-pointer transition-colors duration-200"
          >
            Search Another User
          </Button> */}
          <span className="sm:hidden">
            <Button
              onClick={handleDownload}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white cursor-pointer transition-all duration-200 w-15"
            >
              <Download />
            </Button>
          </span>
        </div>
        <span className="hidden sm:flex">
          <ExportPanel
            onExport={handleDownload}
            setTheme={setTheme}
            hideColorLegend={hideColorLegend}
            sethideColorLegend={sethideColorLegend}
            hideMonthLabels={hideMonthLabels}
            sethideMonthLabels={sethideMonthLabels}
            hideTotalCount={hideTotalCount}
            sethideTotalCount={sethideTotalCount}
            blockMargin={blockMargin}
            setBlockMargin={setBlockMargin}
            blockRadius={blockRadius}
            setBlockRadius={setBlockRadius}
            blockSize={blockSize}
            setBlockSize={setBlockSize}
            fontSize={fontSize}
            setFontSize={setFontSize}
          />
        </span>
      </div>
    </div>
  );
}

// Main page component
export default function UserPage() {
  const params = useParams();
  const username = (params?.username as string) || "";

  return (
    <Suspense
      fallback={
        <div className="container mx-auto my-20 px-2 py-8 flex items-center justify-center min-h-[50vh]">
          <div className="animate-fade-in relative w-full max-w-lg h-fit flex flex-col items-center justify-center">
            <Loader />
          </div>
        </div>
      }
    >
      <UserContributionContent username={username} />
    </Suspense>
  );
}
