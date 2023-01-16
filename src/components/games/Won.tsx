import anime from 'animejs';
import React, { useRef, useEffect } from 'react';

interface Particule {
    x: number;
    y: number;
    color: string;
    radius: number;
    endPos: { x: number; y: number };
    draw: () => void;
}

const Fireworks: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const numberOfParticules = 30;
    const colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];
    let pointerX = 0;
    let pointerY = 0;

    useEffect(() => {
        const canvasEl = canvasRef.current ?? document.createElement("canvas");
        if (!canvasEl) return;
        canvasEl.width = window.innerWidth * 2;
        canvasEl.height = window.innerHeight * 2;
        canvasEl.style.width = window.innerWidth + 'px';
        canvasEl.style.height = window.innerHeight + 'px';
        const ctx = canvasEl.getContext('2d');
        if (ctx) ctx.scale(2, 2);

        const animate = () => {
            anime({
                targets: '#fireworks',
                translateX: anime.random(100, window.innerWidth - 100),
                translateY: anime.random(100, window.innerHeight - 100),
                scale: [0, anime.random(1, 3)],
                rotate: anime.random(-360, 360),
                duration: anime.random(1000, 3000),
                easing: 'easeOutExpo',
                complete: animate,
            });
        };
        animate();
    }, []);

    const setParticuleDirection = (p: Particule) => {
        const angle = anime.random(0, 360) * Math.PI / 180;
        const value = anime.random(50, 180);
        const radius = [-1, 1][anime.random(0, 1)] * value;
        return {
            x: p.x + radius * Math.cos(angle),
            y: p.y + radius * Math.sin(angle)
        }
    }

    const createParticule = (x: number, y: number): Particule => {
        const p: Particule = {
            x: x,
            y: y,
            color: colors[anime.random(0, colors.length - 1)],
            radius: anime.random(16, 32),
            endPos: setParticuleDirection({
                x, y,
                color: '',
                radius: 0,
                endPos: {
                    x: 0,
                    y: 0
                },
                draw: function (): void {
                    throw new Error('Function not implemented.');
                }
            }),
            draw: function () {
                const ctx = canvasRef.current?.getContext('2d');
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
                ctx.fillStyle = p.color;
                ctx.fill();
            }
        };
        return p;
    }

    const renderParticules = () => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (let i = 0; i < numberOfParticules; i++) {
            const x = pointerX + anime.random(-50, 50);
            const y = pointerY + anime.random(-50, 50);
            const p = createParticule(x, y);
            p.draw();
        }
    }

    const handleMouseMove = (e: MouseEvent) => {
        pointerX = e.clientX;
        pointerY = e.clientY;
    }

    const handleTouchMove = (e: TouchEvent) => {
        pointerX = e.touches[0].clientX;
        pointerY = e.touches[0].clientY;
    }

    useEffect(() => {
        const canvasEl = canvasRef.current;
        if (!canvasEl) return;
        canvasEl.addEventListener('mousemove', handleMouseMove);
        canvasEl.addEventListener('touchmove', handleTouchMove);
        renderParticules();
        return () => {
            canvasEl.removeEventListener('mousemove', handleMouseMove);
            canvasEl.removeEventListener('touchmove', handleTouchMove);
        }
    }, [pointerX, pointerY]);

    return (
        <canvas ref={canvasRef} id="fireworks" />
    );
}

export default Fireworks;