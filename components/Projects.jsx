"use strict";

import Section from "./Section";
import { getRepos } from "@/lib/github";
import { Github, ExternalLink } from "lucide-react";

export default async function Projects() {
    const repos = await getRepos();

    return (
        <Section id="projects">
            <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center text-white">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repos.map((repo) => (
                    <div key={repo.id} className="bg-white/5 backdrop-blur border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors flex flex-col h-full">
                        <h3 className="text-xl font-bold text-cyan-300 mb-2 truncate">{repo.name}</h3>
                        <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
                            {repo.description || "No description available."}
                        </p>
                        <div className="flex justify-between items-center mt-auto text-sm">
                            <span className="text-purple-400 font-mono">{repo.language}</span>
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-white hover:text-cyan-300 transition-colors"
                            >
                                <Github size={16} className="mr-1" /> Code
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
