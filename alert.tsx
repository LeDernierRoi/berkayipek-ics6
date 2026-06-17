import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

/**
 * Lightweight 3D background scene. Renders a few floating, slowly rotating
 * weapon-like prisms (knife/awp silhouettes via primitive geometry) so we
 * don't depend on external .glb assets. The scene gently follows the mouse.
 */
function MouseRig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.x * 1.2 - camera.position.x) * 0.04;
    camera.position.y += (-pointer.y * 1.2 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Knife({ position, rotationSpeed, scale = 1 }: { position: [number, number, number]; rotationSpeed: number; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * rotationSpeed;
    ref.current.rotation.x += dt * rotationSpeed * 0.3;
    ref.current.position.y = position[1] + Math.sin(performance.now() * 0.0005 + position[0]) * 0.3;
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      {/* blade */}
      <mesh>
        <boxGeometry args={[0.18, 2.2, 0.04]} />
        <meshStandardMaterial color="#ec4899" metalness={0.9} roughness={0.2} emissive="#9d174d" emissiveIntensity={0.4} />
      </mesh>
      {/* handle */}
      <mesh position={[0, -1.4, 0]}>
        <boxGeometry args={[0.22, 0.7, 0.16]} />
        <meshStandardMaterial color="#1a0a14" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* guard */}
      <mesh position={[0, -1.0, 0]}>
        <boxGeometry args={[0.55, 0.08, 0.2]} />
        <meshStandardMaterial color="#ec4899" metalness={0.95} roughness={0.15} emissive="#ec4899" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

function Scene() {
  const knives = useMemo(
    () => [
      { p: [-4, 1, -3], s: 0.6, sc: 1.1 },
      { p: [4.5, -1, -4], s: -0.4, sc: 1.3 },
      { p: [0, 2.2, -6], s: 0.3, sc: 1.6 },
      { p: [-2.5, -2, -2], s: -0.7, sc: 0.7 },
      { p: [3, 2, -2.5], s: 0.5, sc: 0.8 },
    ] as { p: [number, number, number]; s: number; sc: number }[],
    [],
  );

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.4} color="#ec4899" />
      <pointLight position={[-5, -3, 2]} intensity={0.8} color="#9d174d" />
      <MouseRig />
      {knives.map((k, i) => (
        <Knife key={i} position={k.p} rotationSpeed={k.s} scale={k.sc} />
      ))}
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-50 z-0">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6], fov: 55 }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
