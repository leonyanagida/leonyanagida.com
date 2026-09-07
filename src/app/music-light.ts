// One luminous ribbon rises from each played key.
export function lightPoint(u: number, strand: number, age: number, pitch: number, height: number) {
  const progress = Math.max(0, Math.min(1, age));
  const lift = height * .8 * Math.pow(progress, .86);
  const sway = Math.sin(progress * 4.2 + pitch * .2) * (4 + pitch * .45) * progress;
  const spread = Math.sin(u * Math.PI) * sway;
  return { x: spread, y: -lift * u };
}

export function drawNoteLight(ctx: CanvasRenderingContext2D, width: number, height: number, age: number, pitch: number, originX: number, originY: number, density: number) {
  if (![width, height, age, pitch, originX, originY, density].every(Number.isFinite)) return;
  if (width <= 0 || height <= 0 || age < 0 || age > 1) return;
  const attack = Math.sin(Math.min(age / .1, 1) * Math.PI / 2);
  const opacity = attack * Math.pow(1 - age, 1.2) / Math.max(1, Math.sqrt(density * .22));
  const top = originY - height * .8 * Math.pow(age, .86);
  const palette = [
    [75, 225, 190], [149, 128, 255], [255, 190, 82], [92, 184, 255], [161, 232, 106],
  ][pitch % 5];
  const gradient = ctx.createLinearGradient(originX, originY, originX, top);
  gradient.addColorStop(0, `rgba(${palette[0]},${palette[1]},${palette[2]},0)`);
  gradient.addColorStop(.2, `rgba(${palette[0]},${palette[1]},${palette[2]},${opacity * .58})`);
  gradient.addColorStop(.72, `rgba(${palette[0]},${palette[1]},${palette[2]},${opacity})`);
  gradient.addColorStop(.96, `rgba(248,244,219,${opacity})`);
  gradient.addColorStop(1, "rgba(248,244,219,0)");
  const trace = () => {
    ctx.beginPath();
    for (let i = 0; i <= 52; i++) {
      const point = lightPoint(i / 52, 2, age, pitch, height);
      if (i === 0) ctx.moveTo(originX + point.x, originY + point.y);
      else ctx.lineTo(originX + point.x, originY + point.y);
    }
  };
  ctx.save();
  ctx.lineCap = "round";
  trace();
  ctx.strokeStyle = gradient;
  ctx.globalAlpha = .18;
  ctx.lineWidth = 78;
  ctx.stroke();
  trace();
  ctx.globalAlpha = .95;
  ctx.lineWidth = 42;
  ctx.stroke();
  ctx.restore();
}
