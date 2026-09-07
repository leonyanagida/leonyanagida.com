export type Spring = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
};

// Small time steps keep the same soft response at different display refresh rates.
// Notes only change the target: position and momentum always remain continuous.
export function advanceSpring(spring: Spring, seconds: number) {
  const duration = Math.min(Math.max(seconds, 0), .05);
  const steps = Math.max(1, Math.ceil(duration * 120));
  const dt = duration / steps;
  for (let i = 0; i < steps; i++) {
    spring.vx += ((spring.targetX - spring.x) * 85 - spring.vx * 17) * dt;
    spring.vy += ((spring.targetY - spring.y) * 85 - spring.vy * 17) * dt;
    spring.x += spring.vx * dt;
    spring.y += spring.vy * dt;
    const decay = Math.exp(-dt * 2.4);
    spring.targetX *= decay;
    spring.targetY *= decay;
  }
}
