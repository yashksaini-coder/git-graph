"use client";

import { GitStarButton } from "./gitstarbutton";
import { useTheme } from "next-themes";

export const Header = () => {
    const theme = useTheme();
    const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";
    return (
        <div className="mt-10 w-full flex justify-center">
            <div className="w-3/5 h-14 rounded bg-primary mx-auto border border-border">
                <nav className="p-1 h-full">
                    <div className="flex justify-between items-center mx-8 h-full">
                        <div className="flex items-center rounded p-1 px-2 shadow-sm bg-gradient-to-l from-slate-600 to-indigo-900">
                            <p className="italic">Git Graph</p>
                        </div>
                        <div className="flex justify-center items-center text-white">
                            <GitStarButton />
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};
