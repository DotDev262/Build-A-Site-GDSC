import { useEffect } from 'react';

export function useMouseTrail() {
  useEffect(() => {
    const particles = [];
    const colors = ['#60A5FA', '#3B82F6', '#2563EB'];
    
    const createParticle = (x, y) => {
      const particle = document.createElement('div');
      particle.className = 'pointer-events-none fixed w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-particle z-50';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      document.body.appendChild(particle);
      particles.push(particle);

      setTimeout(() => {
        particle.remove();
        particles.splice(particles.indexOf(particle), 1);
      }, 1000);
    };

    const onMouseMove = (e) => {
      if (Math.random() > 0.33) return; // Only create particle 1/3 of the time
      createParticle(e.clientX, e.clientY);
    };

    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      particles.forEach(p => p.remove());
    };
  }, []);
}
