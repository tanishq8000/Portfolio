import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Sphere, Torus, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Noise function for organic motion
function createNoise() {
    const permutation = []
    for (let i = 0; i < 256; i++) permutation[i] = i
    for (let i = 255; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[permutation[i], permutation[j]] = [permutation[j], permutation[i]]
    }
    const p = [...permutation, ...permutation]

    function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10) }
    function lerp(a, b, t) { return a + t * (b - a) }
    function grad(hash, x, y, z) {
        const h = hash & 15
        const u = h < 8 ? x : y
        const v = h < 4 ? y : h === 12 || h === 14 ? x : z
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
    }

    return function noise(x, y, z) {
        const X = Math.floor(x) & 255
        const Y = Math.floor(y) & 255
        const Z = Math.floor(z) & 255
        x -= Math.floor(x)
        y -= Math.floor(y)
        z -= Math.floor(z)
        const u = fade(x), v = fade(y), w = fade(z)
        const A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z
        const B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z
        return lerp(
            lerp(lerp(grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z), u),
                lerp(grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z), u), v),
            lerp(lerp(grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1), u),
                lerp(grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1), u), v), w)
    }
}

const noise = createNoise()

// Main abstract hero object
function HeroObject({ mousePosition }) {
    const meshRef = useRef()
    const materialRef = useRef()
    const time = useRef(0)

    useFrame((state, delta) => {
        time.current += delta * 0.5

        if (meshRef.current) {
            // Noise-based organic rotation
            const noiseX = noise(time.current * 0.3, 0, 0) * 0.5
            const noiseY = noise(0, time.current * 0.3, 0) * 0.5

            meshRef.current.rotation.x = noiseX + mousePosition.y * 0.3
            meshRef.current.rotation.y = time.current * 0.2 + noiseY + mousePosition.x * 0.3
            meshRef.current.rotation.z = Math.sin(time.current * 0.5) * 0.1

            // Subtle breathing scale
            const breathe = 1 + Math.sin(time.current * 2) * 0.02
            meshRef.current.scale.setScalar(breathe)
        }
    })

    return (
        <group ref={meshRef}>
            {/* Core sphere with transmission material */}
            <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
                <MeshTransmissionMaterial
                    ref={materialRef}
                    backside
                    samples={16}
                    resolution={512}
                    transmission={0.95}
                    roughness={0.1}
                    thickness={0.5}
                    ior={1.5}
                    chromaticAberration={0.4}
                    anisotropy={0.3}
                    distortion={0.2}
                    distortionScale={0.2}
                    temporalDistortion={0.1}
                    color="#8b5cf6"
                />
            </Sphere>

            {/* Inner glowing core */}
            <Sphere args={[0.8, 32, 32]} position={[0, 0, 0]}>
                <meshBasicMaterial color="#c084fc" transparent opacity={0.6} />
            </Sphere>
        </group>
    )
}

// Orbital ring
function OrbitalRing({ radius, speed, rotationAxis, color }) {
    const ringRef = useRef()

    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation[rotationAxis] = state.clock.elapsedTime * speed
        }
    })

    return (
        <group ref={ringRef}>
            <Torus args={[radius, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.8}
                />
            </Torus>

            {/* Orbital particles */}
            {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * Math.PI * 2
                return (
                    <mesh
                        key={i}
                        position={[
                            Math.cos(angle) * radius,
                            0,
                            Math.sin(angle) * radius
                        ]}
                    >
                        <sphereGeometry args={[0.05, 16, 16]} />
                        <meshStandardMaterial
                            color={color}
                            emissive={color}
                            emissiveIntensity={2}
                        />
                    </mesh>
                )
            })}
        </group>
    )
}

// Floating particles
function Particles({ count = 100 }) {
    const mesh = useRef()

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const scales = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)
            const r = 3 + Math.random() * 4

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
            positions[i * 3 + 2] = r * Math.cos(phi)
            scales[i] = Math.random() * 0.5 + 0.5
        }

        return { positions, scales }
    }, [count])

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y = state.clock.elapsedTime * 0.05
            mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
        }
    })

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.positions.length / 3}
                    array={particles.positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#a78bfa"
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    )
}

// Floating accent shapes
function AccentShape({ position, geometry = 'icosahedron', color, scale = 1, speed = 1 }) {
    const meshRef = useRef()
    const floatOffset = useRef(Math.random() * Math.PI * 2)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 * speed
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + floatOffset.current) * 0.3
        }
    })

    const Geometry = () => {
        switch (geometry) {
            case 'octahedron':
                return <octahedronGeometry args={[0.4 * scale]} />
            case 'torus':
                return <torusGeometry args={[0.3 * scale, 0.1 * scale, 16, 32]} />
            case 'tetrahedron':
                return <tetrahedronGeometry args={[0.4 * scale]} />
            default:
                return <icosahedronGeometry args={[0.3 * scale]} />
        }
    }

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} position={position}>
                <Geometry />
                <MeshDistortMaterial
                    color={color}
                    roughness={0.2}
                    metalness={0.8}
                    distort={0.2}
                    speed={2}
                />
            </mesh>
        </Float>
    )
}

export default function HeroScene({ mousePosition = { x: 0, y: 0 }, scrollProgress = 0 }) {
    const { camera } = useThree()
    const groupRef = useRef()

    useFrame(() => {
        if (groupRef.current) {
            // Smooth camera position based on scroll
            camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8 - scrollProgress * 3, 0.05)
            camera.position.y = THREE.MathUtils.lerp(camera.position.y, scrollProgress * 2, 0.05)

            // Group rotation based on mouse
            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                mousePosition.x * 0.1,
                0.05
            )
            groupRef.current.rotation.x = THREE.MathUtils.lerp(
                groupRef.current.rotation.x,
                mousePosition.y * 0.05,
                0.05
            )
        }
    })

    return (
        <group ref={groupRef}>
            <HeroObject mousePosition={mousePosition} />

            {/* Orbital rings */}
            <OrbitalRing radius={2.5} speed={0.3} rotationAxis="y" color="#6366f1" />
            <OrbitalRing radius={3} speed={-0.2} rotationAxis="x" color="#22d3ee" />
            <OrbitalRing radius={3.5} speed={0.15} rotationAxis="z" color="#ec4899" />

            {/* Floating particles */}
            <Particles count={150} />

            {/* Accent shapes */}
            <AccentShape position={[-4, 2, -2]} geometry="icosahedron" color="#6366f1" scale={1.2} />
            <AccentShape position={[4, -1, -1]} geometry="octahedron" color="#ec4899" />
            <AccentShape position={[-3, -2, 1]} geometry="tetrahedron" color="#22d3ee" speed={1.5} />
            <AccentShape position={[3, 2, -3]} geometry="torus" color="#a855f7" scale={1.5} />
        </group>
    )
}
