/**
 * Portfolio JS - Mathis & Nathan
 * Design System: Quantum Flow (Nébuleuse Organique)
 * Implements: Canvas Background, Magnetic Cards, Text Scramble, GSAP Scroll Reveals
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Custom Cursor ---
    const cursor = document.getElementById('custom-cursor');
    const links = document.querySelectorAll('a, button, .magnetic-card');

    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        links.forEach(link => {
            link.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            link.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
    }

    // --- 2. Canvas Background Blobs (Couche 1) ---
    const canvas = document.getElementById('quantum-bg');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let blobs = [];
    let mouseX = 0;
    let mouseY = 0;

    function initCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        
        // Define our 3 organic blobs
        blobs = [
            { x: width * 0.2, y: height * 0.3, vx: 0.15, vy: 0.1, radius: width * 0.4, color: '#8B5CF6' }, // Purple
            { x: width * 0.8, y: height * 0.7, vx: -0.1, vy: -0.15, radius: width * 0.35, color: '#06B6D4' }, // Cyan
            { x: width * 0.5, y: height * 0.5, vx: 0.05, vy: -0.05, radius: width * 0.5, color: '#4C1D95' }  // Darker Purple
        ];
    }

    function animateCanvas() {
        ctx.clearRect(0, 0, width, height);
        
        // Screen blend mode for light integration
        ctx.globalCompositeOperation = 'screen';

        blobs.forEach(blob => {
            // Very slow autonomous drift
            blob.x += blob.vx;
            blob.y += blob.vy;

            // Bounce off edges gently
            if (blob.x <= -blob.radius || blob.x >= width + blob.radius) blob.vx *= -1;
            if (blob.y <= -blob.radius || blob.y >= height + blob.radius) blob.vy *= -1;

            // Subtle parallax effect towards mouse
            const targetX = blob.x + (mouseX - width/2) * 0.05;
            const targetY = blob.y + (mouseY - height/2) * 0.05;

            const finalX = blob.x + (targetX - blob.x) * 0.02;
            const finalY = blob.y + (targetY - blob.y) * 0.02;

            // Draw blurry blob
            const gradient = ctx.createRadialGradient(finalX, finalY, 0, finalX, finalY, blob.radius);
            gradient.addColorStop(0, hexToRgba(blob.color, 0.15));
            gradient.addColorStop(1, hexToRgba(blob.color, 0));
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(finalX, finalY, blob.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animateCanvas);
    }

    // Helper for canvas gradient transparency
    function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
    }

    window.addEventListener('resize', initCanvas);
    initCanvas();
    animateCanvas();


    // --- 3. Magnetic Hover Cards (Couche 3) ---
    const cards = document.querySelectorAll('.magnetic-card');
    
    cards.forEach(card => {
        const glow = card.querySelector('.card-glow');
        
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 768) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation (max 5 degrees)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                scale: 1.02,
                transformPerspective: 1000,
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto"
            });
            
            // Update Glow Position
            if (glow) {
                glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            // Reset rotation smoothly with GSAP spring-like ease
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)",
                overwrite: "auto"
            });
            if (glow) {
                glow.style.background = 'transparent';
            }
        });
    });


    // --- 4. Quantum Text Scramble (Couche 2/3) ---
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '01!@#$%^&*()_+{}|:"<>?~░▒▓';
            this.update = this.update.bind(this);
        }
        
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                // Random start and end frames for each letter
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }

        update() {
            let output = '';
            let complete = 0;
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="scramble-char" style="color: var(--color-primary-quantum); opacity: 0.8;">${char}</span>`;
                } else {
                    output += from;
                }
            }
            this.el.innerHTML = output;
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }


    // --- 5. GSAP Animations & ScrollTriggers (Couche 2) ---
    gsap.registerPlugin(ScrollTrigger);

    // Initial Hero Scramble
    const heroTitle = document.querySelector('.hero-section .scramble-text');
    if(heroTitle) {
        const fx = new TextScramble(heroTitle);
        fx.setText(heroTitle.getAttribute('data-final'));
    }

    // Initialize ScrollTriggers for Text Scramble
    document.querySelectorAll('.section-title.scramble-text').forEach(title => {
        // Create an instance but don't fire yet
        const fx = new TextScramble(title);
        
        ScrollTrigger.create({
            trigger: title,
            start: "top 85%",
            onEnter: () => fx.setText(title.getAttribute('data-final')),
            once: true 
        });
    });

    // Subtitle & General Reveals (Fade In Up)
    const revealElements = document.querySelectorAll('.reveal');
    
    // Group elements by their parent containers for staggering
    const containers = new Set(Array.from(revealElements).map(el => el.parentElement));

    containers.forEach(container => {
        const children = container.querySelectorAll('.reveal');
        if (children.length === 0) return;

        // Check if container wants staggered animation
        if (container.getAttribute('data-stagger') === 'true') {
            gsap.from(children, {
                scrollTrigger: {
                    trigger: container,
                    start: "top 80%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
            });
        } else {
            // Individual reveals
            children.forEach(child => {
                gsap.from(child, {
                    scrollTrigger: {
                        trigger: child,
                        start: "top 85%",
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                });
            });
        }
    });

    // Sticky Nav background change on scroll
    const nav = document.querySelector('.sticky-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

});
