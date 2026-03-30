import * as THREE from "three";
import {
  Environment,
  MeshDistortMaterial,
  ContactShadows,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, a, SpringValue } from "@react-spring/three";

const AnimatedMaterial = a(MeshDistortMaterial);

// Color palette the sphere cycles through on click
const SPHERE_COLORS = ["#202020", "#565173"];

interface SceneProps {
  setBg?: (colors: { background: string; fill: string }) => void;
}

export default function Scene({ setBg }: SceneProps) {
  const sphere = useRef<THREE.Mesh>(null!);
  const light = useRef<THREE.Light>(null!);
  const [hovered, setHovered] = useState(false);
  const [down, setDown] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);

  // Make the bubble float and follow the mouse
  useFrame((state) => {
    if (light.current) {
      light.current.position.x = state.mouse.x * 20;
      light.current.position.y = state.mouse.y * 20;
    }
    if (sphere.current) {
      sphere.current.position.x = THREE.MathUtils.lerp(
        sphere.current.position.x,
        hovered ? state.mouse.x / 2 : 0,
        0.2,
      );
      sphere.current.position.y = THREE.MathUtils.lerp(
        sphere.current.position.y,
        Math.sin(state.clock.elapsedTime / 1.5) / 6 +
          (hovered ? state.mouse.y / 2 : 0),
        0.2,
      );
    }
  });

  type SpringProps = {
    wobble: SpringValue<number>;
    coat: SpringValue<number>;
    ambient: SpringValue<number>;
    env: SpringValue<number>;
    color: SpringValue<string>;
  };

  const currentColor = SPHERE_COLORS[colorIndex];
  const isDefault = colorIndex === 0;

  const { wobble, coat, color, ambient, env } = useSpring<SpringProps>({
    wobble: down ? 1.2 : hovered ? 1.05 : 1,
    coat: isDefault && !hovered ? 0.04 : 1,
    ambient: isDefault && !hovered ? 1.2 : 0.8,
    env: isDefault && !hovered ? 0.4 : 1,
    color: hovered ? "#DC2626" : currentColor,
    config: (key) =>
      key === "wobble" && hovered
        ? { mass: 2, tension: 1000, friction: 10 }
        : { tension: 280, friction: 60 },
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={75}>
        <a.ambientLight intensity={ambient} />
        <a.pointLight
          ref={light}
          position-z={-15}
          intensity={1000}
          color="#b91c1c"
        />
      </PerspectiveCamera>
      <Suspense fallback={null}>
        <a.mesh
          ref={sphere}
          scale={wobble}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onPointerDown={() => setDown(true)}
          onPointerUp={() => {
            setDown(false);
            // Cycle through colors on each click
            const nextIndex = (colorIndex + 1) % SPHERE_COLORS.length;
            setColorIndex(nextIndex);
          }}
        >
          <sphereGeometry args={[1.2, 64, 64]} />
          <AnimatedMaterial
            color={color}
            envMapIntensity={env}
            clearcoat={coat}
            clearcoatRoughness={0}
            metalness={0.1}
          />
        </a.mesh>
        <Environment preset="warehouse" />
        <ContactShadows
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, -1.6, 0]}
          opacity={0.8}
          width={15}
          height={15}
          blur={2.5}
          far={1.6}
        />
      </Suspense>
    </>
  );
}
