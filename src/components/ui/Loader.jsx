import { Html, useProgress } from '@react-three/drei'

export default function Loader() {
    const { progress } = useProgress()

    return (
        <div className="loader">
            <div className="loader-spinner"></div>
            <p className="loader-text">Loading {progress.toFixed(0)}%</p>
        </div>
    )
}

// Canvas loader for 3D scenes
export function CanvasLoader() {
    const { progress } = useProgress()

    return (
        <Html center>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
            }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    border: '3px solid #1a1a25',
                    borderTopColor: '#6366f1',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                }}></div>
                <p style={{
                    color: '#a1a1aa',
                    fontSize: '14px',
                }}>
                    {progress.toFixed(0)}%
                </p>
            </div>
        </Html>
    )
}
