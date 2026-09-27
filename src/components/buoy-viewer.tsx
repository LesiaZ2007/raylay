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
            color="#eceae4"
            metalness={0.14}
            roughness={0.28}
            clearcoat={0.85}
            clearcoatRoughness={0.16}
            sheen={0.35}
            sheenRoughness={0.4}
            sheenColor="#d4cfc6"
            envMapIntensity={1.2}
          />
        </mesh>
      </Center>
    </group>
  );
}

function Scene() {
  return (
    <>
      <hemisphereLight args={["#fffaf3", "#0d1114", 0.45]} />
      <ambientLight intensity={0.18} color="#e8e4dc" />
      <directionalLight
        position={[5.5, 8.5, 4]}
        intensity={2.1}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
      />
      <directionalLight position={[-6, 2.5, -3]} intensity={0.55} color="#8a9098" />
      <directionalLight position={[0, -2, 4]} intensity={0.35} color="#c4b8a8" />
      <spotLight
        position={[2, 8, 3]}
        intensity={1.1}
        color="#fff7ec"
        angle={0.38}
        penumbra={0.65}
        castShadow
      />
      <Environment preset="studio" environmentIntensity={0.7} />
      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.55}
        scale={10}
        blur={2.4}
        far={5}
        color="#000000"
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
