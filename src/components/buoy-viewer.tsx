"use client";

import { Bounds, Center, ContactShadows, Environment } from "@react-three/drei";
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
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            color="#9fd9d6"
            metalness={0.12}
            roughness={0.32}
            clearcoat={0.9}
            clearcoatRoughness={0.18}
            sheen={0.55}
            sheenRoughness={0.4}
            sheenColor="#08bdba"
            envMapIntensity={1.15}
          />
        </mesh>
      </Center>
    </group>
  );
}

function Scene() {
  return (
    <>
      <hemisphereLight args={["#dff7f6", "#062526", 0.7]} />
      <ambientLight intensity={0.28} color="#c8ecea" />
      <directionalLight
        position={[5, 8, 4]}
        intensity={1.55}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
      />
      <directionalLight position={[-5, 3, -3]} intensity={0.85} color="#08bdba" />
      <spotLight
        position={[1, 7, 3]}
        intensity={0.7}
        color="#3ddbd9"
        angle={0.42}
        penumbra={0.55}
        castShadow
      />
      <Environment preset="studio" environmentIntensity={0.55} />
      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.45}
        scale={10}
        blur={2.8}
        far={5}
        color="#041618"
      />
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
            shadows
            camera={{ position: [5.4, 2.4, 6.2], fov: 28, near: 0.1, far: 80 }}
            dpr={[1, 1.6]}
            gl={{ antialias: true, alpha: true }}
            style={{ touchAction: "pan-y", background: "transparent" }}
          >
            <Scene />
          </Canvas>
        </Suspense>
      </ViewerErrorBoundary>
    </div>
  );
}
