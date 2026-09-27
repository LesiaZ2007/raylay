"use client";

import { Center, ContactShadows, Float, OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Component, Suspense, type ReactNode } from "react";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

function RayHull() {
  const geometry = useLoader(STLLoader, "/models/RAY.stl");
  geometry.computeVertexNormals();

  return (
    <Float speed={1.15} rotationIntensity={0.18} floatIntensity={0.35}>
      <Center>
        <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} scale={0.042} castShadow>
          <meshPhysicalMaterial
            color="#9ed9d4"
            metalness={0.22}
            roughness={0.3}
            clearcoat={0.7}
            clearcoatRoughness={0.22}
            sheen={0.35}
            sheenColor="#d7fff6"
            envMapIntensity={1.05}
          />
        </mesh>
      </Center>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#07161d"]} />
      <fog attach="fog" args={["#07161d", 16, 42]} />
      <hemisphereLight args={["#d8f4ef", "#12343a", 0.85]} />
      <directionalLight position={[6, 9, 4]} intensity={1.55} color="#fff1c2" />
      <directionalLight position={[-7, 3, -5]} intensity={0.7} color="#3ecfc4" />
      <spotLight position={[0, 12, 2]} intensity={0.55} color="#f4d27a" angle={0.45} penumbra={0.7} />
      <RayHull />
      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.38}
        scale={14}
        blur={2.4}
        far={8}
        color="#031014"
      />
      <OrbitControls
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.55}
        minDistance={5.5}
        maxDistance={16}
        maxPolarAngle={Math.PI / 1.72}
      />
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
      <div className="text-center">
        <div className="mx-auto mb-3 size-10 rounded-full border border-teal-200/30 border-t-amber-200/90 animate-spin" />
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-teal-100/70">
          Loading RAY
        </p>
      </div>
    </div>
  );
}

function FailedHull() {
  return (
    <div className="absolute inset-0 grid place-items-center px-6 text-center">
      <p className="max-w-xs text-sm text-teal-100/75">
        The 3D hull needs WebGL. The rest of the talk still stands — scroll for sensors and impact.
      </p>
    </div>
  );
}

export function BuoyViewer({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ViewerErrorBoundary fallback={<FailedHull />}>
        <Suspense fallback={<LoadingHull />}>
          <Canvas
            camera={{ position: [6.2, 3.4, 7.4], fov: 38 }}
            dpr={[1, 1.75]}
            gl={{ antialias: true, alpha: false }}
          >
            <Scene />
          </Canvas>
        </Suspense>
      </ViewerErrorBoundary>
    </div>
  );
}
