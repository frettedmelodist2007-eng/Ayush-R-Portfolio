"use strict";
"use client";

import Galaxy from "./Galaxy";
import CameraController from "./CameraController";
import { Stars } from "@react-three/drei";

export default function Experience() {
    return (
        <>
            <CameraController />
            <ambientLight intensity={0.5} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* Galaxy 1: Orange/Blue */}
            <Galaxy
                position={[0, 0, 0]}
                insideColor="#ff6030"
                outsideColor="#1b3984"
            />

            {/* Galaxy 2: Pink/Purple */}
            <Galaxy
                position={[0, -5, -20]}
                insideColor="#ff0080"
                outsideColor="#4b0082"
                radius={7}
            />

            {/* Galaxy 3: Cyan/Green */}
            <Galaxy
                position={[5, 2, -40]}
                insideColor="#00ffff"
                outsideColor="#00ff00"
                radius={6}
                spin={-1}
            />
        </>
    );
}
