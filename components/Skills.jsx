"use strict";
"use client";

import Section from "./Section";

const skills = {
    "Programming": ["Python", "C++", "JavaScript", "SQL"],
    "Web Dev": ["HTML5/CSS3", "React.js", "Next.js", "Three.js", "WebGL"],
    "App Dev": ["Android Development", "React Native"],
    "Tools": ["Git & GitHub", "Linux/Bash", "REST APIs", "DSP"],
};

export default function Skills() {
    return (
        <Section>
            <h2 className="text-4xl md:text-6xl font-bold mb-12 text-right text-white">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(skills).map(([category, items]) => (
                    <div key={category} className="p-6 border border-white/20 rounded-xl bg-white/5 backdrop-blur hover:bg-white/10 transition-colors">
                        <h3 className="text-2xl font-bold mb-4 text-purple-300">{category}</h3>
                        <ul className="space-y-2">
                            {items.map((item) => (
                                <li key={item} className="flex items-center text-gray-300">
                                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Section>
    );
}
