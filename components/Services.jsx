"use strict";
"use client";

import Section from "./Section";

const services = [
    {
        title: "Website Development",
        desc: "Frontend & Full-Stack solutions using modern frameworks like Next.js and React."
    },
    {
        title: "Android App Development",
        desc: "Building native and cross-platform mobile applications."
    },
    {
        title: "Multimedia Editing",
        desc: "Professional Video and Photo editing services."
    }
];

export default function Services() {
    return (
        <Section className="bg-black/30 backdrop-blur-sm">
            <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center text-white">Services</h2>
            <div className="flex flex-wrap justify-center gap-8">
                {services.map((service, index) => (
                    <div key={index} className="max-w-sm p-8 border border-cyan-500/30 rounded-2xl bg-gradient-to-br from-purple-900/20 to-cyan-900/20 hover:scale-105 transition-transform duration-300">
                        <h3 className="text-2xl font-bold mb-3 text-cyan-300">{service.title}</h3>
                        <p className="text-gray-300">{service.desc}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
}
