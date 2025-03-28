"use client";
import { GitStarButton } from "./gitstarbutton";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export const Header = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isExtraSmall, setIsExtraSmall] = useState(false);

    useEffect(() => {
        const checkIfMobileSize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
            setIsExtraSmall(width < 350);
        };

        checkIfMobileSize();
        window.addEventListener("resize", checkIfMobileSize);

        return () => window.removeEventListener("resize", checkIfMobileSize);
    }, []);

    return (
        <div className="mt-10 w-full flex justify-center">
            <div className="w-full md:w-4/5 lg:w-3/5 h-14 rounded-2xl bg-slate-800/30 mx-auto border border-slate-800/30 backdrop-blur-md">
                <nav className="p-1 h-full">
                    <div className="flex justify-between items-center mx-2 sm:mx-6 h-full">
                        <div className="flex items-center rounded py-3 px-0 sm:px-2">
                            <div className="flex flex-nowrap gap-1 sm:gap-2 px-1 sm:px-3">
                                <div className={`h-7 sm:h-8 px-1.5 py-1 border-2 ${isMobile ? 'border-black bg-indigo-500 text-black' : 'border-white hover:border-black hover:bg-indigo-500 text-white hover:text-black'} font-bold text-xs sm:text-sm rounded-md`}>
                                    [<a className="font-mono hover:underline" href="https://github.com/yashksaini-coder/git-graph" target="_blank" rel="noopener noreferrer">
                                        {isMobile ? "Git" : "GitHub"}
                                    </a>]
                                </div>
                                <div className={`h-7 sm:h-8 px-1.5 py-1 border-2 ${isMobile ? 'border-black bg-fuchsia-500 text-black' : 'border-white hover:border-black hover:bg-fuchsia-500 text-white hover:text-black'} font-bold text-xs sm:text-sm rounded-md`}>
                                    [<a className="font-mono hover:underline" href="https://github.com/sponsors/yashksaini-coder" target="_blank" rel="noopener noreferrer">
                                        {isMobile ? "Spon" : "Sponsor"}
                                    </a>]
                                </div>
                                <div className={`h-7 sm:h-8 px-1.5 py-1 border-2 ${isMobile ? 'border-black bg-indigo-500 text-black' : 'border-white hover:border-black hover:bg-indigo-500 text-white hover:text-black'} font-bold text-xs sm:text-sm rounded-md`}>
                                    <button>
                                        <Search size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={`flex justify-center items-center text-white transition-transform ${isMobile ? (isExtraSmall ? 'scale-50' : 'scale-75') : ''}`}>
                            <GitStarButton />
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};
