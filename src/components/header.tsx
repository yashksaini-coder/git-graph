"use client";
import { GitStarButton } from "./gitstarbutton";

export const Header = () => {
    return (
        <div className="mt-10 w-full flex justify-center">
            <div className="w-3/5 h-14 rounded-2xl bg-slate-800/30 mx-auto border border-slate-800/30 backdrop-blur-md">
                <nav className="p-1 h-full">
                    <div className="flex justify-between items-center mx-6 h-full">
                        <div className="flex items-center rounded py-3 px-2">
                            <div className="flex gap-2 px-3">
                                <div className="h-8 px-1.5 py-1 border-2 border-white hover:border-black hover:bg-indigo-500 text-white hover:text-black font-bold text-sm rounded-md">
                                    [ <a className="font-mono hover:underline" href="https://github.com/yashksaini-coder/git-graph" target="_blank" rel="noopener noreferrer">
                                    GitHub</a> ]
                                </div>
                                <div className="h-8 px-1.5 py-1 border-2 border-white hover:border-black hover:bg-fuchsia-500 text-white hover:text-black font-bold text-sm rounded-md">
                                    [ <a className="font-mono hover:underline" href="https://github.com/sponsors/yashksaini-coder" target="_blank" rel="noopener noreferrer">
                                    Sponsor</a> ]
                                </div>
                            </div>
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
