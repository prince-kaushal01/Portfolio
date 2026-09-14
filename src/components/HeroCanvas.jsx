import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FloatingShape() {
  const meshRef = useRef()
  const { viewport, mouse } = useThree()

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += 0.003
    meshRef.current.rotation.y += 0.005
    // subtle cursor parallax
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      (mouse.x * viewport.width) / 8,
      0.04
    )
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      (mouse.y * viewport.height) / 8,
      0.04
    )
  })

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 2]} />
        <MeshDistortMaterial
          color="#00D9FF"
          attach="material"
          distort={0.35}
          speed={1.5}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.18}
          wireframe={false}
        />
      </mesh>
      {/* Wireframe outline */}
      <mesh>
        <icosahedronGeometry args={[1.65, 2]} />
        <meshBasicMaterial
          color="#00D9FF"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </Float>
  )
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#00D9FF" />
      <pointLight position={[-5, -5, 3]} intensity={0.6} color="#0EA5E9" />
      <FloatingShape />
    </Canvas>
  )
}
