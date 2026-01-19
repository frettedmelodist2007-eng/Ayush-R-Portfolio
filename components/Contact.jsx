"use strict";
"use client";

import Section from "./Section";
import { Mail, Phone, Github, Linkedin, Instagram, Twitter } from "lucide-react";

export default function Contact() {
    return (
        <Section id="contact" className="min-h-[50vh]">
            <div className="text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">Get In Touch</h2>
                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                    I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>

                <div className="flex flex-wrap justify-center gap-8 mb-16">
                    <a href="mailto:frettedmelodist2007@gmail.com" className="flex items-center text-xl text-white hover:text-cyan-400 transition-colors">
                        <Mail className="mr-3" /> frettedmelodist2007@gmail.com
                    </a>
                    <a href="tel:+918891256695" className="flex items-center text-xl text-white hover:text-cyan-400 transition-colors">
                        <Phone className="mr-3" /> +91 8891256695
                    </a>
                </div>

                <div className="flex justify-center gap-8 mb-16">
                    <SocialLink href="https://github.com/frettedmelodist2007-eng" icon={Github} />
                    <SocialLink href="https://www.linkedin.com/in/ayush-r" icon={Linkedin} />
                    <SocialLink href="https://www.instagram.com/fretted_melodist" icon={Instagram} />
                    <SocialLink href="https://x.com/frettedmelodist" icon={Twitter} />
                </div>

                <footer className="text-gray-500 pt-8 border-t border-white/10">
                    <p>© {new Date().getFullYear()} Ayush R | Built with passion for technology and innovation</p>
                </footer>
            </div>
        </Section>
    );
}

function SocialLink({ href, icon: Icon }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white/5 rounded-full hover:bg-white/20 transition-all transform hover:scale-110 text-white"
        >
            <Icon size={24} />
        </a>
    );
}
