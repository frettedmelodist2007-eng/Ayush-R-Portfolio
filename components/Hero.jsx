"use strict";
"use client";

import Section from "./Section";

export default function Hero() {
    return (
        <Section>
            <div className="max-w-4xl">
                <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                    Ayush R
                    <span className="block text-2xl md:text-4xl text-white mt-4 font-light">
                        Building the Future with AI
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
                    B.Tech Artificial Intelligence Student | Full-Stack Developer | Tech Problem Solver
                </p>

                <div className="flex flex-wrap gap-4">
                    <a
                        href="#projects"
                        className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105"
                    >
                        View My Projects
                    </a>
                    <a
                        href="#contact"
                        className="px-8 py-3 border border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    >
                        Contact Me
                    </a>
                </div>
            </div>
        </Section>
    );
}
