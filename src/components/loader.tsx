import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import React from 'react';

export const Loader = () => {
    const messages = [
        // "Checking your PRs...",
        // "Looking at what you cooked...",
        // "Analyzing your code...",
        "Reading your commits...",
        "Measuring your impact...",
        "Checking your contributions...",
        "Verifiying your contributions...",
        // "Checking your repositories...",
        // "Analyzing your pull requests...",
        // "Reading your issues...",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % messages.length);
        }, 2000);

        return () => clearInterval(timer);
    }, [messages.length]);

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center justify-center space-x-1">
                {[...Array(5)].map((_, index) => (
                    <motion.div
                        key={index}
                        className="h-8 w-2 rounded bg-purple-500"
                        animate={{
                            scaleY: [1, 1.5, 1],
                            translateY: ['0%', '-25%', '0%'],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: index * 0.1,
                        }}
                    />
                ))}
            </div>
            <div className="h-8 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.h3
                        key={currentIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className="font-bold text-white text-center"
                    >
                        {messages[currentIndex]}
                    </motion.h3>
                </AnimatePresence>
            </div>
        </div>
    );
};
