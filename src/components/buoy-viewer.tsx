"use client";

import { Bounds, Center, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Component, Suspense, useMemo, useRef, type ReactNode } from "react";
import { Box3, Vector3, type Group } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

function RayHull() {
  const geometry = useLoader(STLLoader, "/models/RAY.stl");
  const group = useRef<Group>(null);

  const prepared = useMemo(() => {
    const next = geometry.clone();
    next.computeVertexNormals();
    next.computeBoundingBox();
    next.center();
    const size = new Vector3();
    (next.boundingBox ?? new Box3()).getSize(size);
    const longest = Math.max(size.x, size.y, size.z) || 1;
    return { geometry: next, scale: 5.2 / longest };
  }, [geometry]);

  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.16;
  });

  return (
    <group ref={group}>
      <Center>
        <mesh
          geometry={prepared.geometry}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={prepared.scale}
        >
          <meshStandardMaterial
            color="#d4d4d4"
            metalness={0.18}
            roughness={0.42}
            envMapIntensity={0.8}
          />
        </mesh>
      </Center>
    </group>
  );
}

function Scene() {
  return (
    <>
      <hemisphereLight args={["#f4f4f4", "#0b3b3c", 0.7]} />
      <directionalLight position={[5, 8, 4]} intensity={1.15} color="#ffffff" />
      <directionalLight position={[-4, 2, -3]} intensity={0.35} color="#08bdba" />
      <Bounds fit observe margin={1.45} clip={false} maxDuration={0.6}>
        <RayHull />
      </Bounds>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={false}
        minPolarAngle={0.7}
        maxPolarAngle={1.55}
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

export function BuoyViewer({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ViewerErrorBoundary
        fallback={
          <p className="grid h-full place-items-center px-6 text-center text-sm text-ink-3">
            The hull model needs WebGL in this browser.
          </p>
        }
      >
        <Suspense
          fallback={
            <div className="grid h-full place-items-center">
              <div className="size-8 rounded-full border border-white/20 border-t-accent animate-spin" />
            </div>
          }
        >
          <Canvas
            camera={{ position: [7.2, 3.8, 7.8], fov: 32, near: 0.1, far: 80 }}
            dpr={[1, 1.6]}
            gl={{ antialias: true, alpha: true }}
            style={{ touchAction: "pan-y" }}
          >
            <Scene />
          </Canvas>
        </Suspense>
      </ViewerErrorBoundary>
    </div>
  );
}
