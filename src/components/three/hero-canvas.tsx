"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, PresentationControls } from "@react-three/drei";
import * as THREE from "three";
import { VortexCore } from "./vortex-core";
import { FloatingIcons } from "./floating-icons";

function ParallaxRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!group.current) return;
    const targetX = (state.mouse.x * viewport.width) / 40;
    const targetY = (state.mouse.y * viewport.height) / 40;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY, 0.04);
  });

  return <group ref={group}>{children}</group>;
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[5, 5, 5]} intensity={80} color="#3b82ff" />
      <pointLight position={[-5, -3, -5]} intensity={60} color="#a855f7" />
      <spotLight
        position={[0, 8, 4]}
        angle={0.4}
        penumbra={1}
        intensity={120}
        castShadow
        color="#ffffff"
      />
    </>
  );
}

export function HeroCanvas() {
  return (
    <div className="absolute inset-0">
      <Canvas
        shadows
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 8], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneLights />
          <PresentationControls
            global
            polar={[-0.2, 0.2]}
            azimuth={[-0.3, 0.3]}
            config={{ mass: 2, tension: 300 }}
            snap
          >
            <ParallaxRig>
              <VortexCore />
              <FloatingIcons />
            </ParallaxRig>
          </PresentationControls>
          <ContactShadows
            position={[0, -2.4, 0]}
            opacity={0.5}
            scale={12}
            blur={2.8}
            far={4}
            color="#3b82ff"
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
