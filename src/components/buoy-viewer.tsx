"use client";

import { Bounds, Center } from "@react-three/drei";
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
    return { geometry: next, scale: 6.4 / longest };
  }, [geometry]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.22;
    group.current.rotation.z = Math.sin(t * 0.35) * 0.12;
    group.current.position.y = Math.sin(t * 0.55) * 0.18;
  });

  return (
    <group ref={group}>
      <Center>
        <mesh
          geometry={prepared.geometry}
          rotation={[-Math.PI / 2.15, 0.15, 0.2]}
          scale={prepared.scale}
        >
          <meshStandardMaterial
            color="#e4e4e4"
            metalness={0.28}
            roughness={0.36}
            envMapIntensity={1}
          />
        </mesh>
      </Center>
    </group>
  );
}

function Scene() {
  return (
    <>
      <hemisphereLight args={["#f4f4f4", "#0b3b3c", 0.55]} />
      <directionalLight position={[4, 7, 6]} intensity={1.35} color="#ffffff" />
      <directionalLight position={[-6, 1, -2]} intensity={0.7} color="#08bdba" />
      <spotLight position={[0, 8, 2]} intensity={0.45} color="#3ddbd9" angle={0.5} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.55, 0]}>
        <ringGeometry args={[1.15, 2.35, 64]} />
        <meshBasicMaterial color="#08bdba" transparent opacity={0.12} />
      </mesh>
      <Bounds fit observe margin={1.08} clip={false} maxDuration={0.5}>
        <RayHull />
      </Bounds>
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
            camera={{ position: [5.4, 2.4, 6.2], fov: 28, near: 0.1, far: 80 }}
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
