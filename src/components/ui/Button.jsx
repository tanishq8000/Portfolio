import { Link } from 'react-router-dom'

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    href,
    to,
    onClick,
    type = 'button',
    disabled = false,
    className = '',
    ...props
}) {
    const baseClass = 'btn'
    const variantClass = `btn-${variant}`
    const sizeClass = size === 'lg' ? 'btn-lg' : ''
    const classes = `${baseClass} ${variantClass} ${sizeClass} ${className}`.trim()

    // External link
    if (href) {
        return (
            <a
                href={href}
                className={classes}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
            >
                {children}
            </a>
        )
    }

    // Internal link
    if (to) {
        return (
            <Link to={to} className={classes} {...props}>
                {children}
            </Link>
        )
    }

    // Button
    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}
