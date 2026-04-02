'use client';
import React, { useRef, useState, useCallback } from 'react';

export default function TiltCard({ children, style, className }) {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateX = ((mouseY / height) - 0.5) * -15; // Max 15 degree tilt
    const rotateY = ((mouseX / width) - 0.5) * 15;

    setRotation({ x: rotateX, y: rotateY });
  }, []);

  const handleMouseEnter = () => setIsHovering(true);
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        position: 'relative',
        transition: isHovering ? 'none' : 'transform 0.5s ease',
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovering ? 1.02 : 1}, ${isHovering ? 1.02 : 1}, 1)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Inner glare effect */}
      {isHovering && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: `radial-gradient(circle at ${rotation.y * 10 + 50}% ${rotation.x * -10 + 50}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          pointerEvents: 'none',
          zIndex: 10,
          borderRadius: 'inherit'
        }} />
      )}
      {children}
    </div>
  );
}
