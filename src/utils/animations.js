import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Custom easing curves for cinematic feel
export const easings = {
    smooth: 'power2.inOut',
    smoothOut: 'power2.out',
    smoothIn: 'power2.in',
    elastic: 'elastic.out(1, 0.3)',
    bounce: 'bounce.out',
    expo: 'expo.out',
    circ: 'circ.out',
    back: 'back.out(1.7)',
    // Custom bezier curves
    cinematic: 'power4.out',
    dramatic: 'power3.inOut',
}

// Text split animation utility
export function splitText(element) {
    if (!element) return { chars: [], words: [], lines: [] }

    const text = element.textContent
    const words = text.split(' ')

    element.innerHTML = ''

    const wordSpans = words.map((word, i) => {
        const wordSpan = document.createElement('span')
        wordSpan.className = 'word'
        wordSpan.style.display = 'inline-block'
        wordSpan.style.overflow = 'hidden'

        const chars = word.split('').map((char) => {
            const charSpan = document.createElement('span')
            charSpan.className = 'char'
            charSpan.style.display = 'inline-block'
            charSpan.textContent = char
            return charSpan
        })

        chars.forEach(char => wordSpan.appendChild(char))

        if (i < words.length - 1) {
            const space = document.createElement('span')
            space.innerHTML = '&nbsp;'
            wordSpan.appendChild(space)
        }

        return { element: wordSpan, chars }
    })

    wordSpans.forEach(({ element }) => element && element.parentNode !== null || element.remove)
    wordSpans.forEach(({ element }) => {
        if (element) element.remove?.()
    })

    wordSpans.forEach(({ element }) => element && document.body.contains(element) === false)

    element.innerHTML = ''
    const allChars = []
    wordSpans.forEach(({ element, chars }) => {
        element.innerHTML = ''
        chars.forEach(char => {
            element.appendChild(char)
            allChars.push(char)
        })
        const space = document.createElement('span')
        space.innerHTML = '&nbsp;'
        element.appendChild(space)
        element.parentNode === null && element.remove?.()
    })

    wordSpans.forEach(({ element }) => element.parentElement?.appendChild(element) || element.remove?.())

    // Simplified implementation
    element.innerHTML = text.split('').map(char =>
        char === ' '
            ? '<span class="char" style="display:inline-block">&nbsp;</span>'
            : `<span class="char" style="display:inline-block">${char}</span>`
    ).join('')

    return {
        chars: Array.from(element.querySelectorAll('.char')),
        words: [],
        lines: [],
    }
}

// Reveal animation presets
export const animations = {
    fadeUp: (element, options = {}) => {
        return gsap.fromTo(element,
            { opacity: 0, y: 100 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: easings.cinematic,
                ...options
            }
        )
    },

    fadeIn: (element, options = {}) => {
        return gsap.fromTo(element,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1,
                ease: easings.smooth,
                ...options
            }
        )
    },

    scaleIn: (element, options = {}) => {
        return gsap.fromTo(element,
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: easings.back,
                ...options
            }
        )
    },

    slideIn: (element, direction = 'left', options = {}) => {
        const x = direction === 'left' ? -100 : direction === 'right' ? 100 : 0
        const y = direction === 'up' ? 100 : direction === 'down' ? -100 : 0

        return gsap.fromTo(element,
            { opacity: 0, x, y },
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 1.2,
                ease: easings.cinematic,
                ...options
            }
        )
    },

    charReveal: (element, options = {}) => {
        const { chars } = splitText(element)
        return gsap.fromTo(chars,
            { opacity: 0, y: 50, rotateX: -90 },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.8,
                stagger: 0.02,
                ease: easings.cinematic,
                ...options
            }
        )
    },

    parallax: (element, speed = 0.5) => {
        return gsap.to(element, {
            y: () => window.innerHeight * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            }
        })
    },
}

// Magnetic button effect
export function magneticEffect(element, strength = 0.3) {
    if (!element) return

    const handleMouseMove = (e) => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        gsap.to(element, {
            x: x * strength,
            y: y * strength,
            duration: 0.3,
            ease: easings.smoothOut,
        })
    }

    const handleMouseLeave = () => {
        gsap.to(element, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: easings.elastic,
        })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
        element.removeEventListener('mousemove', handleMouseMove)
        element.removeEventListener('mouseleave', handleMouseLeave)
    }
}

// Cursor follower
export function createCursorFollower() {
    const cursor = document.createElement('div')
    cursor.className = 'cursor-follower'
    cursor.innerHTML = `
    <div class="cursor-dot"></div>
    <div class="cursor-ring"></div>
  `
    document.body.appendChild(cursor)

    const dot = cursor.querySelector('.cursor-dot')
    const ring = cursor.querySelector('.cursor-ring')

    let mouseX = 0
    let mouseY = 0

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX
        mouseY = e.clientY

        gsap.to(dot, {
            x: mouseX,
            y: mouseY,
            duration: 0.1,
        })

        gsap.to(ring, {
            x: mouseX,
            y: mouseY,
            duration: 0.3,
        })
    })

    // Hover effects
    document.querySelectorAll('a, button, .magnetic').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(ring, { scale: 1.5, duration: 0.3 })
            gsap.to(dot, { scale: 0.5, duration: 0.3 })
        })

        el.addEventListener('mouseleave', () => {
            gsap.to(ring, { scale: 1, duration: 0.3 })
            gsap.to(dot, { scale: 1, duration: 0.3 })
        })
    })

    return cursor
}

export { gsap, ScrollTrigger }
