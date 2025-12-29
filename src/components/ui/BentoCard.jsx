export default function BentoCard({
    children,
    className = '',
    large = false,
    image = null,
    ...props
}) {
    const cardClass = `bento-card ${large ? 'bento-card-large' : ''} ${className}`.trim()

    return (
        <div className={cardClass} {...props}>
            {image && (
                <div className="bento-card-image">
                    <img src={image} alt="" loading="lazy" />
                </div>
            )}
            {children}
        </div>
    )
}
