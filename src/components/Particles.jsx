import { useEffect, useRef } from 'react';

export default function Particles({ count = 40 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = [];
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 1;
      const left = Math.random() * 100;
      const delay = Math.random() * 8;
      const duration = Math.random() * 6 + 6;

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: #00f3ff;
        border-radius: 50%;
        left: ${left}%;
        bottom: ${Math.random() * 30}%;
        opacity: 0;
        box-shadow: 0 0 ${size * 3}px #00f3ff88, 0 0 ${size * 6}px #00f3ff33;
        animation: float-particle ${duration}s ${delay}s ease-in-out infinite;
        pointer-events: none;
      `;
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, [count]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-10"
    />
  );
}