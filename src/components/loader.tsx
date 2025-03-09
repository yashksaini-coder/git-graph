import { useState, useEffect } from "react";

interface LoaderProps {
    isActive: boolean;
}

export default function Loader ({ isActive }: LoaderProps) {
    const [matrix, setMatrix] = useState<string[][]>([]);

    useEffect(() => {
        if (isActive) {
            const interval = setInterval(() => {
                setMatrix(
                    Array.from({ length: 10 }, () =>
                    Array.from({ length: 35 }, () => (Math.random() > 0.5 ? "1" : "0"))
                )
                );
            }, 100);
            return () => clearInterval(interval);
        } else {
            setMatrix([]);
        }
    }, [isActive]);

    return isActive ? (
        <div className="absolute inset-0 w-full h-full bg-black opacity-80 rounded-xl overflow-hidden">
            <pre className="absolute top-0 left-0 w-full h-full text-green-400 text-xs font-mono p-2">
                {matrix.map((row, i) => (
                    <div key={i}>{row.join(" ")}</div>
                ))}
            </pre>
        </div>
    ) : null;
}