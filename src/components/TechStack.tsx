import * as THREE from "three";
import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  type RapierRigidBody,
} from "@react-three/rapier";

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

const imageUrls = [
  "/images/python.png",
  "/images/power-bi.png",
  "/images/mysql.png",
  "/images/github.png",
  "/images/matplotlib.png",
];

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r,
  texture,
}: {
  vec?: THREE.Vector3;
  scale: number;
  r: (range: number) => number;
  texture: THREE.Texture;
}) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    delta = Math.min(0.1, delta);
    const translation = api.current?.translation();
    if (!translation) return;

    const impulse = vec
      .set(translation.x, translation.y, translation.z)
      .normalize()
      .multiplyScalar(-150 * delta * scale);

    api.current?.applyImpulse(impulse, true);
  });

  const material = useMemo(() => new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.FrontSide,
  }), [texture]);

  return (
    <RigidBody
      linearDamping={0.5}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20), r(10)]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      {/* ⚪️ Dark metallic ball base */}
      <mesh scale={scale} geometry={sphereGeometry}>
        <meshStandardMaterial 
            color="#111111" 
            metalness={0.9} 
            roughness={0.1} 
        />
      </mesh>
      {/* 🖼️ Logo layer */}
      <mesh
        scale={scale * 1.01}
        geometry={sphereGeometry}
        material={material}
      />
    </RigidBody>
  );
}

function Pointer({
  vec = new THREE.Vector3(),
}: {
  vec?: THREE.Vector3;
}) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2.5]} />
    </RigidBody>
  );
}

const TechStackScene = () => {
  // useTexture handles loading and sRGB conversion automatically
  const textures = useTexture(imageUrls);
  
  const spheres = useMemo(() => [...Array(40)].map(() => ({
    scale: [0.8, 1.0, 1.2, 0.9][Math.floor(Math.random() * 4)],
  })), []);

  const r = THREE.MathUtils.randFloatSpread;

  return (
    <>
      <ambientLight intensity={2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Physics gravity={[0, 0, 0]}>
        <Pointer />
        {spheres.map((props, i) => (
          <SphereGeo 
            key={i} 
            scale={props.scale} 
            r={r} 
            texture={textures[i % textures.length]} 
          />
        ))}
      </Physics>
    </>
  );
}

const TechStack = () => {
  return (
    <div className="techstack" style={{ minHeight: "800px", width: "100%", background: "#000", position: "relative" }}>
      <h2 style={{ textAlign: "center", padding: "50px 0", color: "#fff", fontSize: "3.5rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "4px" }}>
        My Techstack
      </h2>

      <Canvas camera={{ position: [0, 0, 20], fov: 35 }}>
        <Suspense fallback={null}>
          <TechStackScene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TechStack;
