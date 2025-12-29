import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingShape({ position, geometry, color, scale, rotationSpeed }) {
    const meshRef = useRef()

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += rotationSpeed.x
            meshRef.current.rotation.y += rotationSpeed.y
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3
        }
    })

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            {geometry}
            <meshStandardMaterial
                color={color}
                roughness={0.3}
                metalness={0.7}
                transparent
                opacity={0.6}
            />
        </mesh>
    )
}

export default function FloatingShapes({ count = 20, scrollProgress = 0 }) {
    const groupRef = useRef()

    const shapes = useMemo(() => {
        const colors = ['#6366f1', '#a855f7', '#ec4899', '#22d3ee', '#818cf8']
        const geometries = [
            <icosahedronGeometry args={[1, 0]} />,
            <octahedronGeometry args={[1]} />,
            <tetrahedronGeometry args={[1]} />,
            <boxGeometry args={[1, 1, 1]} />,
        ]

        return Array.from({ length: count }, (_, i) => ({
            id: i,
            position: [
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 15 - 5,
            ],
            geometry: geometries[Math.floor(Math.random() * geometries.length)],
            color: colors[Math.floor(Math.random() * colors.length)],
            scale: 0.1 + Math.random() * 0.3,
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
            },
        }))
    }, [count])

    useFrame(() => {
        if (groupRef.current) {
            // Move shapes based on scroll
            groupRef.current.position.y = scrollProgress * 5
            groupRef.current.rotation.y = scrollProgress * 0.5
        }
    })

    return (
        <group ref={groupRef}>
            {shapes.map((shape) => (
                <FloatingShape
                    key={shape.id}
                    position={shape.position}
                    geometry={shape.geometry}
                    color={shape.color}
                    scale={shape.scale}
                    rotationSpeed={shape.rotationSpeed}
                />
            ))}
        </group>
    )
}
