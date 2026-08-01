"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Coin({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 1.2;
  });
  return (
    <Float speed={2} floatIntensity={1.2} position={position}>
      <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.06, 32]} />
        <meshStandardMaterial color={color} metalness={1} roughness={0.25} emissive={color} emissiveIntensity={0.2} />
      </mesh>
    </Float>
  );
}

function GiftCard({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.3;
  });
  return (
    <Float speed={1.6} floatIntensity={1} position={position}>
      <mesh ref={ref} rotation={[0.3, 0.5, 0]}>
        <boxGeometry args={[0.6, 0.4, 0.02]} />
        <meshPhysicalMaterial
          color="#12122a"
          metalness={0.6}
          roughness={0.2}
          emissive="#3b82ff"
          emissiveIntensity={0.4}
          clearcoat={1}
        />
      </mesh>
    </Float>
  );
}

function CrystalShard({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.4;
      ref.current.rotation.y += delta * 0.6;
    }
  });
  return (
    <Float speed={1.8} floatIntensity={1.4} position={position}>
      <mesh ref={ref} scale={0.35}>
        <coneGeometry args={[0.5, 1.2, 6]} />
        <meshPhysicalMaterial
          color={color}
          transmission={0.6}
          thickness={0.8}
          roughness={0.05}
          metalness={0.1}
          emissive={color}
          emissiveIntensity={0.35}
        />
      </mesh>
    </Float>
  );
}

/** A ring of orbiting collectibles (coins, gift cards, crystal shards) around the hero core. */
export function FloatingIcons() {
  const items = useMemo(
    () => [
      { type: "coin", pos: [2.6, 0.6, -0.5] as [number, number, number], color: "#ffd166" },
      { type: "coin", pos: [-2.8, -0.4, 0.6] as [number, number, number], color: "#60a5fa" },
      { type: "card", pos: [-2.2, 1.2, -1] as [number, number, number] },
      { type: "card", pos: [2.4, -1, 1] as [number, number, number] },
      { type: "shard", pos: [0.2, 2.1, 0.4] as [number, number, number], color: "#a855f7" },
      { type: "shard", pos: [-1.6, -1.8, -0.6] as [number, number, number], color: "#3b82ff" },
      { type: "shard", pos: [1.8, 1.9, -1.2] as [number, number, number], color: "#22d3ee" },
    ],
    []
  );

  return (
    <>
      {items.map((item, i) =>
        item.type === "coin" ? (
          <Coin key={i} position={item.pos} color={item.color!} />
        ) : item.type === "card" ? (
          <GiftCard key={i} position={item.pos} />
        ) : (
          <CrystalShard key={i} position={item.pos} color={item.color!} />
        )
      )}
    </>
  );
}
