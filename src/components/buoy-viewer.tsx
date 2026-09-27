"use client";

import { Center, Float } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Component, Suspense, useRef, type ReactNode } from "react";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import type { Group, Mesh } from "three";

function RayHull() {
  const geometry = useLoader(STLLoader, "/models/RAY.stl");
  geometry.computeVertexNormals();
  const group = useRef<Group>(null);

  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.22;
  });

  return (
    <group ref={group}>
      <Float speed={1.05} rotationIntensity={0.12} floatIntensity={0.28}>
        <Center>
          <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} scale={0.046} castShadow>
            <meshPhysicalMaterial
              color="#9ed9d4"
              metalness={0.2}
              roughness={0.28}
              clearcoat={0.65}
              clearcoatRoughness={0.2}
              sheen={0.4}
              sheenColor="#d7fff6"
              envMapIntensity={1}
            />
          </mesh>
        </Center>
      </Float>
    </group>
  );
}

function OrbitHalo() {
  const a = useRef<Mesh>(null);
  const b = useRef<Mesh>(null);
  const c = useRef<Mesh>(null);

  useFrame((_, dt) => {
    if (a.current) a.current.rotation.z += dt * 0.18;
    if (b.current) b.current.rotation.z -= dt * 0.12;
    if (c.current) c.current.rotation.z += dt * 0.07;
  });

  return (
    <group rotation={[0.7, 0.2, 0.1]}>
      <mesh ref={a}>
        <torusGeometry args={[3.15, 0.012, 8, 96]} />
        <meshBasicMaterial color="#f4d27a" transparent opacity={0.42} />
      </mesh>
      <mesh ref={b} rotation={[0.4, 0.6, 0]}>
        <torusGeometry args={[3.7, 0.008, 8, 96]} />
        <meshBasicMaterial color="#9ed9d4" transparent opacity={0.28} />
      </mesh>
      <mesh ref={c} rotation={[1.1, -0.3, 0.4]}>
        <torusGeometry args={[4.3, 0.006, 8, 80]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <hemisphereLight args={["#d8f4ef", "#12343a", 0.9]} />
      <directionalLight position={[6, 9, 4]} intensity={1.5} color="#fff1c2" />
      <directionalLight position={[-7, 3, -5]} intensity={0.65} color="#3ecfc4" />
      <spotLight position={[0, 12, 2]} intensity={0.45} color="#f4d27a" angle={0.5} penumbra={0.7} />
      <RayHull />
      <OrbitHalo />
    </>
  );
}

class ViewerErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

function LoadingHull() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="size-10 rounded-full border border-teal-200/25 border-t-amber-200/90 animate-spin" />
    </div>
  );
}

export function BuoyViewer({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ViewerErrorBoundary
        fallback={
          <div className="absolute inset-0 grid place-items-center text-sm text-teal-100/70">
            WebGL didn’t load. The rest of the talk still works.
          </div>
        }
      >
        <Suspense fallback={<LoadingHull />}>
          <Canvas
            camera={{ position: [6.4, 3.2, 7.6], fov: 36 }}
            dpr={[1, 1.6]}
            gl={{ antialias: true, alpha: true }}
          >
            <Scene />
          </Canvas>
        </Suspense>
      </ViewerErrorBoundary>
    </div>
  );
}
