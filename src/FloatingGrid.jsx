import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { RepeatWrapping, TextureLoader } from "three";
import gridTexture from "../public/textures/grid-texture.png"

export function FloatingGrid() {
  const diffuse = useLoader(TextureLoader, gridTexture);

  useEffect(() => {
    diffuse.wrapS = RepeatWrapping;
    diffuse.wrapT = RepeatWrapping;
    diffuse.anisotropy = 4;
    diffuse.repeat.set(30, 30);
    diffuse.offset.set(0, 0);
  }, [diffuse]);

  useFrame((state, delta) => {
    let t = -state.clock.getElapsedTime() * 0.68;
    diffuse.offset.set(0, t);
  });

  return <>
      <mesh rotation-x={-Math.PI * 0.5} position={[0, 0.2, 0]}>
      <planeGeometry args={[35, 35]} />
      <meshBasicMaterial
        color={[1, 1, 1]}
        opacity={0.15}
        map={diffuse}
        alphaMap={diffuse}
        transparent={true}
      />
    </mesh>
  </>
}