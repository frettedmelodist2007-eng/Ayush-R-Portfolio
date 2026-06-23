"use strict";
"use client";

import Section from "./Section";
import profile from "@/lib/profile.json";

export default function About() {
    const paragraphs = profile.about.paragraphs;
    const half = Math.ceil(paragraphs.length / 2);
    const col1 = paragraphs.slice(0, half);
    const col2 = paragraphs.slice(half);

    return (
        <Section className="bg-black/30 backdrop-blur-sm">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">About Me</h2>
            <div className="grid md:grid-cols-2 gap-8 text-lg text-gray-200">
                <div>
                    {col1.map((p, index) => (
                        <p key={index} className="mb-4">
                            {p}
                        </p>
                    ))}
                </div>
                <div>
                    {col2.map((p, index) => (
                        <p key={index} className="mb-4">
                            {p}
                        </p>
                    ))}
                </div>
            </div>
        </Section>
    );
}

