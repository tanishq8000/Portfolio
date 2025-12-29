import { Environment as DreiEnvironment } from '@react-three/drei'

export default function Environment() {
    return (
        <>
            {/* Ambient light for overall illumination */}
            <ambientLight intensity={0.2} />

            {/* Main directional light */}
            <directionalLight
                position={[10, 10, 5]}
                intensity={1}
                color="#ffffff"
                castShadow
            />

            {/* Accent lights for color */}
            <pointLight
                position={[-10, 5, -10]}
                intensity={0.5}
                color="#6366f1"
            />

            <pointLight
                position={[10, -5, 10]}
                intensity={0.5}
                color="#ec4899"
            />

            <pointLight
                position={[0, 10, 0]}
                intensity={0.3}
                color="#22d3ee"
            />

            {/* Environment map for reflections */}
            <DreiEnvironment preset="night" />

            {/* Fog for depth */}
            <fog attach="fog" args={['#0a0a0f', 10, 30]} />
        </>
    )
}
