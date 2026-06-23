"use strict";
"use client";

import Section from "./Section";

export default function About() {
    return (
        <Section className="bg-black/30 backdrop-blur-sm">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">About Me</h2>
            <div className="grid md:grid-cols-2 gap-8 text-lg text-gray-200">
                <div>
                    <p className="mb-4">
                        I am a B.Tech Artificial Intelligence student with a strong interest in full-stack development and modern software engineering.
                    </p>
                    <p className="mb-4">
                        I enjoy building practical applications and systems that simplify complex problems through automation and clean design.
                    </p>
                </div>
                <div>
                    <p className="mb-4">
                        Driven by curiosity and continuous learning, I focus on creating efficient, scalable, and real-world solutions using technology.
                    </p>
                </div>
            </div>
        </Section>
    );
}
