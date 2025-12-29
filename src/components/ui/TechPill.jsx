export default function TechPill({ children, href, onClick, ...props }) {
    const Tag = href ? 'a' : 'div'

    return (
        <Tag
            className="tech-pill"
            href={href}
            onClick={onClick}
            {...props}
        >
            {children}
        </Tag>
    )
}
