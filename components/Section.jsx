"use strict";
"use client";

import { motion } from "framer-motion";

export default function Section({ children, className = "", id, ...props }) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className={`min-h-screen flex flex-col justify-center px-8 md:px-20 py-16 relative z-10 ${className}`}
            id={id}
            {...props}
            style={{ pointerEvents: 'none' }} // Allow clicks to pass through to canvas if needed, but usually we want interaction on text
        >
            <div style={{ pointerEvents: 'auto' }}>
                {children}
            </div>
        </motion.section>
    );
}
