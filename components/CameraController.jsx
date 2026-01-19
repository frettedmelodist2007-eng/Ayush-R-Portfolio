"use strict";
"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function CameraController() {
    const targetPosition = useRef(new THREE.Vector3(0, 0, 0));

    useFrame((state, delta) => {
        // Basic scroll implementation
        // In a real app, use a more robust scroll hook or state manager
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

        // Move camera along Z axis based on scroll
        // Start at [0, 2, 5] for example, and go to [0, 2, -100]
        const startZ = 12;
        const endZ = -40; // Travel distance

        // Smooth lerp
        const currentZ = THREE.MathUtils.lerp(startZ, endZ, scrollProgress);

        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, currentZ, delta * 2);

        // Also look around slightly?
        // For now, straight flight
    });

    return null;
}
