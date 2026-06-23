"use strict";
"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

export default function CanvasContainer({ children }) {
    return (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
            <Canvas
                camera={{ position: [0, 20, 0], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    {children}
                </Suspense>
            </Canvas>
        </div>
    );
}
