import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { CanvasLoader } from '../ui/Loader'

export default function Scene({ children, cameraPosition = [0, 0, 8], fov = 50, enableEffects = true }) {
    return (
        <Canvas
            camera={{ position: cameraPosition, fov }}
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
                stencil: false,
            }}
            dpr={[1, 2]}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
            }}
        >
            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6366f1" />
            <pointLight position={[10, -5, 10]} intensity={0.3} color="#ec4899" />

            {/* Environment for reflections */}
            <Environment preset="night" />

            {/* Fog for depth */}
            <fog attach="fog" args={['#0a0a0f', 8, 30]} />

            <Suspense fallback={<CanvasLoader />}>
                {children}

                {/* Post-processing effects */}
                {enableEffects && (
                    <EffectComposer>
                        <Bloom
                            intensity={0.5}
                            luminanceThreshold={0.2}
                            luminanceSmoothing={0.9}
                            mipmapBlur
                        />
                        <ChromaticAberration
                            blendFunction={BlendFunction.NORMAL}
                            offset={[0.0005, 0.0005]}
                        />
                        <Vignette
                            offset={0.3}
                            darkness={0.5}
                            blendFunction={BlendFunction.NORMAL}
                        />
                    </EffectComposer>
                )}

                <Preload all />
            </Suspense>
        </Canvas>
    )
}
