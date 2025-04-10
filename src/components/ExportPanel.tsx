import React, { useState, useEffect, useRef } from "react";
import { IoColorPaletteOutline } from "react-icons/io5";
import { FaBorderStyle } from "react-icons/fa";
import { MdCenterFocusWeak } from "react-icons/md";
import { AiOutlineFontSize } from "react-icons/ai";
import { Download } from "lucide-react";
import ThemesPanel from "@/components/shared/ThemesPanel";
import HidePanel from "./shared/HidePanel";
import BlockPanel from "./shared/BlockPanel";
import FontPanel from "./shared/FontPanel";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { ThemeInput } from "react-activity-calendar";

const ExportPanel = ({
  onExport,
  setTheme,
  hideColorLegend,
  sethideColorLegend,
  hideMonthLabels,
  sethideMonthLabels,
  hideTotalCount,
  sethideTotalCount,
  blockMargin,
  setBlockMargin,
  blockRadius,
  setBlockRadius,
  blockSize,
  setBlockSize,
  fontSize,
  setFontSize,
}: {
  onExport: () => void;
  setTheme: (theme: ThemeInput) => void;
  hideColorLegend: boolean;
  sethideColorLegend: (value: boolean) => void;
  hideMonthLabels: boolean;
  sethideMonthLabels: (value: boolean) => void;
  hideTotalCount: boolean;
  sethideTotalCount: (value: boolean) => void;
  blockMargin: number;
  setBlockMargin: (value: number) => void;
  blockRadius: number;
  setBlockRadius: (value: number) => void;
  blockSize: number;
  setBlockSize: (value: number) => void;
  fontSize: number;
  setFontSize: (value: number) => void;
}) => {
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const togglePopover = (popoverName: string) => {
    setActivePopover((prev) => (prev === popoverName ? null : popoverName));
  };

  // Close popover when clicking outside the Dock
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(event.target as Node)) {
        setActivePopover(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Dock
      direction="middle"
      className="hidden sm:flex backdrop-blur-sm border border-gray-800 shadow-xl gap-3 px-4 py-2 rounded-full bg-gray-900/50"
      ref={dockRef}
    >
      {/* IoColorPaletteOutline Button */}
      <DockIcon
        onClick={() => togglePopover("theme")}
        className="border border-gray-800 shadow-xl transition-colors duration-200"
      >
        <IoColorPaletteOutline className="text-white text-lg" />
      </DockIcon>
      {activePopover === "theme" && (
        <span className="absolute top-[-255px] right-[20%] transform -translate-x-1/2 p-3 rounded-xl shadow-lg z-50 ">
          <ThemesPanel setTheme={setTheme} />
        </span>
      )}

      {/* FaBorderStyle Button */}
      <DockIcon
        onClick={() => togglePopover("blockStyle")}
        className="border border-gray-800 shadow-xl transition-colors duration-200"
      >
        <FaBorderStyle className="text-white text-lg" />
      </DockIcon>
      {activePopover === "blockStyle" && (
        <span className="absolute top-[-288px] left-1/2 transform -translate-x-1/2 backdrop-blur-xl p-4  z-50 ">
          <BlockPanel
            blockMargin={blockMargin}
            setBlockMargin={setBlockMargin}
            blockRadius={blockRadius}
            setBlockRadius={setBlockRadius}
            blockSize={blockSize}
            setBlockSize={setBlockSize}
          />
        </span>
      )}

      {/* MdCenterFocusWeak Button */}
      <DockIcon
        onClick={() => togglePopover("hide")}
        className="border border-gray-800 shadow-xl transition-colors duration-200"
      >
        <MdCenterFocusWeak className="text-white text-lg" />
      </DockIcon>
      {activePopover === "hide" && (
        <span className="absolute top-[-302px] left-[70%] transform -translate-x-1/2 p-4 rounded-xl shadow-lg z-50">
          <HidePanel
            hideColorLegend={hideColorLegend}
            sethideColorLegend={sethideColorLegend}
            hideMonthLabels={hideMonthLabels}
            sethideMonthLabels={sethideMonthLabels}
            hideTotalCount={hideTotalCount}
            sethideTotalCount={sethideTotalCount}
          />
        </span>
      )}

      {/* AiOutlineFontSize Button */}
      <DockIcon
        onClick={() => togglePopover("font")}
        className="border border-gray-800 shadow-xl transition-all duration-100"
      >
        <AiOutlineFontSize className="text-white text-lg" />
      </DockIcon>
      {activePopover === "font" && (
        <span className="absolute top-[-184px] left-[110%] transform -translate-x-1/2  p-4 rounded-xl shadow-lg z-50">
          <FontPanel fontSize={fontSize} setFontSize={setFontSize} />
        </span>
      )}

      {/* Download Button */}
      <DockIcon
        onClick={onExport}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white cursor-pointer transition-all duration-200 w-15 h-15 rounded-full flex items-center justify-center shadow-lg"
      >
        <Download className="text-white text-lg" />
      </DockIcon>
    </Dock>
  );
};

export default ExportPanel;
