"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Icosahedron, Octahedron } from "@react-three/drei";
import * as THREE from "three";

/**
 * Stylized 3D centerpiece for the hero section — an icosahedral "vortex core"
 * with an inner distorted crystal, built entirely from primitive R3F geometry
 * (no external .glb required). Swap in a licensed .glb model via useGLTF for
 * a literal loot box / controller / gift card mesh if you have one — see
 * README for instructions.
 */
export function VortexCore() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x += delta * 0.25;
      innerRef.current.rotation.y -= delta * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.1;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef}>
        {/* Outer faceted shell */}
        <Icosahedron args={[1.6, 1]}>
          <meshPhysicalMaterial
            color="#0a1128"
            metalness={0.9}
            roughness={0.15}
            transmission={0.35}
            thickness={1.2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            emissive="#3b82ff"
            emissiveIntensity={0.15}
          />
        </Icosahedron>

        {/* Inner glowing distorted crystal */}
        <mesh ref={innerRef} scale={0.75}>
          <Octahedron args={[1, 2]}>
            <MeshDistortMaterial
              color="#a855f7"
              emissive="#7c3aed"
              emissiveIntensity={0.6}
              distort={0.35}
              speed={2}
              roughness={0.1}
              metalness={0.3}
            />
          </Octahedron>
        </mesh>

        {/* Orbiting energy ring */}
        <group ref={ringRef}>
          <mesh rotation={[Math.PI / 2.2, 0, 0]}>
            <torusGeometry args={[2.3, 0.02, 16, 100]} />
            <meshBasicMaterial color="#3b82ff" toneMapped={false} />
          </mesh>
          <mesh rotation={[Math.PI / 2.2, 0, Math.PI / 6]}>
            <torusGeometry args={[2.6, 0.012, 16, 100]} />
            <meshBasicMaterial color="#a855f7" toneMapped={false} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}
