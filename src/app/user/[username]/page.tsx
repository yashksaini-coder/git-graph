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
import html2canvas from "html2canvas";
import axios from "axios";
// import { Switch } from "@radix-ui/react-switch";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRight } from "lucide-react";
import { IoColorPaletteOutline } from "react-icons/io5";
import { FaBorderStyle } from "react-icons/fa";
import { MdCenterFocusWeak } from "react-icons/md";
import { AiOutlineFontSize } from "react-icons/ai";
import BlockPanel from "@/components/shared/BlockPanel";
import FontPanel from "@/components/shared/FontPanel";

const getShareImage = async (divRef: React.RefObject<HTMLDivElement | null>, filename?: string) => {
  if (!divRef.current) {
    toast.error("Unable to find the element to capture.");
    return;
  }

  const graphElement = divRef.current!;
  const originalWidth = graphElement.style.width;
  const originalOverflow = graphElement.style.overflow;

  // Temporarily adjust the graph element for better capture
  graphElement.style.width = "1200px";
  graphElement.style.overflow = "visible";

  // Force a supported background color
  const originalBackgroundColor = graphElement.style.backgroundColor;
  graphElement.style.backgroundColor = "#1a1a1a"; // Set to a supported color

  await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for styles to apply

  try {
    // Capture the graph element as an image
    const canvas = await html2canvas(graphElement, {
      backgroundColor: "#1a1a1a", // Ensure background color is set
      useCORS: true, // Allow cross-origin images
    });

    // Restore the original styles
    graphElement.style.width = originalWidth;
    graphElement.style.overflow = originalOverflow;
    graphElement.style.backgroundColor = originalBackgroundColor;

    // Convert the canvas to a base64 image
    const base64Image: string = canvas.toDataURL("image/png").split(",")[1]; // Remove the prefix

    // Prepare the form data for ImgBB upload
    const formData = new FormData();
    formData.append("image", base64Image);
    formData.append("name", filename || "contribution-graph");
    formData.append("key", process.env.NEXT_PUBLIC_IMGBB_API_KEY || "");

    console.log("Form Data:", formData);

    // Upload the image to ImgBB
    const response = await axios.post("https://api.imgbb.com/1/upload", formData);
    console.log("ImgBB Response:", response.data);
    const imageUrl = response.data.data.url;
    // console.log(object)
    // Copy the image URL to the clipboard
    navigator.clipboard.writeText(imageUrl);
    toast.success("Image URL copied to clipboard! Sharing on Twitter...");

    // Open Twitter's share URL with the image link
    window.open(
      `https://twitter.com/intent/tweet?text=Check%20out%20my%20GitHub%20contributions!&url=${encodeURIComponent(
        imageUrl
      )}`,
      "_blank"
    );
  } catch (error) {
    console.error("Image upload failed:", error);
    toast.error("Failed to upload the image.");
  }
};

function UserContributionContent({ username }: { username: string }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [theme, setTheme] = useState(DefaultTheme);
  const [themeName, setThemeName] = useState("Default");
  const [contributionData, setContributionData] =
    useState<ContributionCalendar | null>(null);
  const downloadDivRef = useRef<HTMLDivElement>(null);
  const dataFetchedRef = useRef(false);
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

  const handleShareImage = useCallback(async () => {
    await getShareImage(downloadDivRef, `${username}-github-contributions`);
  }, [username]);

  const handleBackToSearch = useCallback(() => {
    router.push("/");
  }, [router]);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const startTime = Date.now();
        const minLoadingTime = 5000;

        const contributions = await getContributions(username);

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
      <Sheet
        onOpenChange={(open) => {
          if (!open) {
            setShowCustomization(false);
            setshowBlockOptions(false);
            setShowHideOptions(false);
            setShowFontOptions(false);
          }
        }}
      >
        <SheetTrigger className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full py-3 px-3 text-2xl shadow-lg z-50 lg:hidden md:hidden">
          <RiSidebarFoldFill className="text-white" />
        </SheetTrigger>
        <SheetContent className="backdrop-blur">
          <SheetHeader className="mt-14 overflow-y-scroll">
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
              onClick={() => setShowHideOptions((prev) => !prev)}
              className="flex justify-between rounded-2xl my-1 hover:bg-[#ffffff25]"
            >
              <div className="flex justify-center items-center">
                <MdCenterFocusWeak className="mr-2" /> Hide
              </div>{" "}
              <ChevronRight
                className={`ml-2 h-5 w-5 ${
                  showHideOptions ? "rotate-90" : ""
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
              onClick={() => setShowFontOptions((prev) => !prev)}
              className="flex justify-between rounded-2xl my-1 hover:bg-[#ffffff25]"
            >
              <div className="flex justify-center items-center">
                <AiOutlineFontSize className="mr-2" /> Fonts
              </div>{" "}
              <ChevronRight
                className={`ml-2 h-5 w-5 ${
                  showFontOptions ? "rotate-90" : ""
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
          <span className="sm:hidden">
            <Button
              onClick={handleDownload}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white cursor-pointer transition-all duration-200 w-15"
            >
              <Download />
            </Button>
          </span>
          <span className="sm:hidden">
            <Button
              onClick={handleShareImage}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white cursor-pointer transition-all duration-200 w-15"
            >
              Share
            </Button>
          </span>
        </div>
        <div className="flex items-center justify-center mt-6">
          <Button
            onClick={handleShareImage}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            Share on Twitter
          </Button>
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
