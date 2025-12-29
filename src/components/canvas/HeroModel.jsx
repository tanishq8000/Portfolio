import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, GradientTexture } from '@react-three/drei'
import * as THREE from 'three'

function Sphere({ position, color1, color2, scale = 1, speed = 1 }) {
    const meshRef = useRef()

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <icosahedronGeometry args={[1, 4]} />
                <MeshDistortMaterial
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                >
                    <GradientTexture
                        stops={[0, 1]}
                        colors={[color1, color2]}
                    />
                </MeshDistortMaterial>
            </mesh>
        </Float>
    )
}

function Torus({ position, color, scale = 1 }) {
    const meshRef = useRef()

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
        }
    })

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <torusGeometry args={[1, 0.4, 16, 32]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.1}
                    metalness={0.9}
                    emissive={color}
                    emissiveIntensity={0.2}
                />
            </mesh>
        </Float>
    )
}

function Octahedron({ position, color, scale = 1 }) {
    const meshRef = useRef()

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.4
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.2
        }
    })

    return (
        <Float speed={2.5} rotationIntensity={0.4} floatIntensity={1.2}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <octahedronGeometry args={[1]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.15}
                    metalness={0.85}
                    wireframe={false}
                />
            </mesh>
        </Float>
    )
}

export default function HeroModel({ mousePosition = { x: 0, y: 0 } }) {
    const groupRef = useRef()

    useFrame(() => {
        if (groupRef.current) {
            // Subtle rotation based on mouse position
            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                mousePosition.x * 0.3,
                0.05
            )
            groupRef.current.rotation.x = THREE.MathUtils.lerp(
                groupRef.current.rotation.x,
                mousePosition.y * 0.2,
                0.05
            )
        }
    })

    return (
        <group ref={groupRef}>
            {/* Main central sphere */}
            <Sphere
                position={[0, 0, 0]}
                color1="#6366f1"
                color2="#a855f7"
                scale={1.5}
                speed={0.5}
            />

            {/* Surrounding shapes */}
            <Torus
                position={[-3, 1, -2]}
                color="#22d3ee"
                scale={0.6}
            />

            <Octahedron
                position={[3, -1, -1]}
                color="#ec4899"
                scale={0.7}
            />

            <Sphere
                position={[-2, -2, 1]}
                color1="#a855f7"
                color2="#ec4899"
                scale={0.5}
                speed={1.5}
            />

            <Octahedron
                position={[2.5, 2, -2]}
                color="#6366f1"
                scale={0.4}
            />

            <Torus
                position={[0, 3, -3]}
                color="#a855f7"
                scale={0.5}
            />
        </group>
    )
}
