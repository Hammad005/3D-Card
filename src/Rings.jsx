import { useFrame } from '@react-three/fiber';
import { useRef } from 'react'
import { Color } from 'three';

const Rings = () => {
    const itemsRef = useRef([]);

    useFrame((state) => {
        let elapsed = state.clock.getElapsedTime();
        for (let i = 0; i < itemsRef.current.length; i++) {
            let mesh = itemsRef.current[i];
            
            let z = (i - 7) * 3.5 + ((elapsed * 0.4) % 3.5) * 2;
            mesh.position.set(0, 0, -z);

            let dist = Math.abs(z);
            mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04);

            let colorScale = 1;
            if (dist > 2) {
                colorScale = 1 - (Math.min(dist, 12) - 2) / 10;
            }
            colorScale *= 0.5;

            if (i % 2 == 1) {
                mesh.material.emissive = new Color(6, 0.15, 0.7).multiplyScalar(colorScale);
            }else{
                mesh.material.emissive = new Color(0.1, 0.7, 3).multiplyScalar(colorScale)
            }
        }
    });

  return (
    <>
    {
        Array.from({ length: 14 }).map((v, i) => (
            <mesh
            castShadow
            receiveShadow 
            key={i} 
            ref={(el) => (itemsRef.current[i] = el)}>
                <torusGeometry args={[3.35, 0.05, 16, 100]} />
                <meshStandardMaterial emissive={[0.05, 0.05, 0.05]}  color={[0, 0, 0]}/>
            </mesh>
        ))
    }
    </>
  )
}

export default Rings