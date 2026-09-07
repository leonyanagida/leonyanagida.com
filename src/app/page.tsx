"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import MusicExperience, { type NoteEvent } from "./music-experience";
import { ArrowDown, ArrowUp, ArrowUpRight, CornerDownRight, Pause, Play, Plus, X } from "lucide-react";

function Field({ paused, noteEvent, performing, onActivate }: {
  paused: boolean; noteEvent: NoteEvent; performing: boolean; onActivate: () => void;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const signal = useRef({ note: -1, pulse: 0, sequence: 0 });
  useEffect(() => {
    signal.current.note = noteEvent.index;
    signal.current.pulse = 1;
    signal.current.sequence = noteEvent.sequence;
  }, [noteEvent]);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    let width = 0, height = 0, frame = 0, time = 0;
    let visible = true;
    const blend = 1;
    const pointer = { x: .5, y: .5, inside: false };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const left = width * .07, span = width * .86;
      const middle = height * .5;
      const rowGap = Math.min(height * .064, 25);
      // Eight piano pitches, each drawn as a bundle of harmonic traces.
      // Page-wide musical notes excite these standing waves at fixed endpoints.
      for (let row = 0; row < 8; row++) {
        const chosen = signal.current.note === row;
        const proximity = pointer.inside ? Math.max(0, 1 - Math.abs(pointer.y - row / 7) * 2) : 0;
        const energy = chosen ? signal.current.pulse : 0;
        for (let strand = 0; strand < 7; strand++) {
          const depth = strand / 6;
          ctx.beginPath();
          for (let column = 0; column <= 88; column++) {
            const u = column / 88;
            const envelope = Math.pow(Math.sin(u * Math.PI), 1.25);
            const harmonic = Math.sin(u * Math.PI * (2 + row * .24) - time * .8 + row * .43 + depth * .6);
            const overtone = Math.sin(u * Math.PI * 6 + time * 1.2 + depth) * .18;
            const ripple = Math.sin(u * Math.PI * (row + 2) - time * 7) * energy;
            const amplitude = height * (.105 + proximity * .035 + energy * .06);
            const x = left + u * span;
            const latticeY = middle + (row - 3.5) * rowGap + (strand - 3) * 3;
            const tilt = (u - .5) * height * -.23 * blend;
            const y = latticeY + tilt + envelope * (harmonic + overtone + ripple * .45) * amplitude * blend;
            if (column === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(192,220,140,${(.04 + depth * .035 + energy * .15) * blend})`;
          ctx.lineWidth = .65;
          ctx.stroke();
          for (let column = 0; column <= 88; column++) {
            const u = column / 88;
            const envelope = Math.pow(Math.sin(u * Math.PI), 1.25);
            const harmonic = Math.sin(u * Math.PI * (2 + row * .24) - time * .8 + row * .43 + depth * .6);
            const overtone = Math.sin(u * Math.PI * 6 + time * 1.2 + depth) * .18;
            const ripple = Math.sin(u * Math.PI * (row + 2) - time * 7) * energy;
            const amplitude = height * (.105 + proximity * .035 + energy * .06);
            const x = left + u * span;
            const y = middle + (row - 3.5) * rowGap + (strand - 3) * 3
              + (u - .5) * height * -.23 * blend
              + envelope * (harmonic + overtone + ripple * .45) * amplitude * blend;
            const alpha = .17 + depth * .42 + energy * .3;
            ctx.fillStyle = chosen ? `rgba(217,245,165,${alpha})` : `rgba(192,213,170,${alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, .7 + depth * .55 + energy * .5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };
    const resize = () => {
      width = el.clientWidth;
      height = el.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      el.width = width * dpr;
      el.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    let previous = 0, previousSequence = signal.current.sequence;
    const tick = (now: number) => {
      const delta = Math.min((now - previous) / 1000, .04);
      const animate = !paused && !reduce.matches;
      const changed = previousSequence !== signal.current.sequence;
      if (visible && !document.hidden && (animate || changed)) {
        if (animate) {
          time += delta;
          signal.current.pulse *= Math.exp(-delta * 1.8);
        } else {
          signal.current.pulse = 0;
        }
        draw();
      }
      previousSequence = signal.current.sequence;
      previous = now;
      frame = requestAnimationFrame(tick);
    };
    const move = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / width;
      pointer.y = (event.clientY - rect.top) / height;
      pointer.inside = true;
    };
    const leave = () => { pointer.inside = false; };
    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    ro.observe(el); io.observe(el);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    resize(); frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame); ro.disconnect(); io.disconnect();
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [paused]);

  return <div className="harmonic-field">
    <div className="field-heading"><span className="mono">FIG. 01 — CODE INTO MUSIC</span></div>
    <canvas ref={canvas} className="field" aria-hidden="true" />
    <div className="field-invitation"><button className="music-enter" onClick={onActivate} aria-pressed={performing}><span>{performing ? "Back to the quiet" : "What if this page could play?"}</span><span aria-hidden="true">{performing ? <X size={18}/> : <ArrowUpRight size={18}/>}</span></button><p className="mono">{performing ? "A little code. A little music. All you." : "A small experiment, waiting for you."}</p></div>
  </div>;
}

const expertise = [
  { title: "Full-stack web systems", tag: "FROM INTERFACE TO API", detail: "I design and develop complete product flows across frontend, backend, APIs, and application logic—with a focus on maintainability and speed.", tools: "React / Next.js / TypeScript" },
  { title: "Architecture & infrastructure", tag: "THE INVISIBLE FOUNDATION", detail: "From system architecture and APIs to deployment, environments, and monitoring, I build the foundations that keep software reliable and ready to grow.", tools: "AWS Cloud / System architecture" },
  { title: "Product-minded engineering", tag: "THE BIGGER PICTURE", detail: "Engineering, usability, and business context belong in the same conversation. I bring them together to build solutions that are clear, effective, and useful.", tools: "Product thinking / Customer focus" },
];

function Focus() {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="focus"><div className="focus-caption"><span className="mono">HOW I THINK & BUILD</span><p>Many moving parts.<br/>One considered whole.</p><div className="learning mono"><span className="status-dot"/> CURRENTLY EXPLORING<br/><strong>AWS Cloud Certifications</strong></div></div><div className="expertise">{expertise.map((item,i) => <div className={open === i ? "expertise-row is-open" : "expertise-row"} key={item.title}><button aria-expanded={open === i} aria-controls={`expertise-${i}`} onClick={() => setOpen(open === i ? null : i)}><span className="mono">0{i+1}</span><span>{item.title}</span><Plus size={20}/></button><div id={`expertise-${i}`} className="expertise-detail" hidden={open !== i}><span className="mono">{item.tag}</span><p>{item.detail}</p><span className="tools mono">{item.tools}</span></div></div>)}</div></div>;
}

export default function Home() {
  const [paused, setPaused] = useState(false);
  const [performing, setPerforming] = useState(false);
  const [noteEvent, setNoteEvent] = useState<NoteEvent>({ index: -1, sequence: 0 });
  const enterButton = useRef<HTMLButtonElement | null>(null);
  const onNote = useCallback((index: number) => setNoteEvent(previous => ({ index, sequence: previous.sequence + 1 })), []);
  const exitMusic = useCallback(() => {
    setPerforming(false);
    enterButton.current?.focus({ preventScroll: true });
  }, []);
  const toggleMusic = useCallback(() => {
    enterButton.current = document.querySelector<HTMLButtonElement>(".music-enter");
    setPerforming(current => !current);
  }, []);
  const togglePause = useCallback(() => setPaused(current => !current), []);
  useEffect(() => {
    const elements = document.querySelectorAll(".about-heading, .about-grid, .focus, .work-title, .work-story, .hello");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer.unobserve(entry.target); } });
    }, { threshold: .08 });
    elements.forEach(element => { element.classList.add("reveal"); observer.observe(element); });
    return () => observer.disconnect();
  }, []);
  return <div className={`site${paused ? " motion-paused" : ""}${performing ? " music-enabled" : ""}`}>
    <a className="skip-link" href="#about">Skip to content</a>
    <header className="header"><a className="wordmark" href="#top" aria-label="Leon Yanagida home">ly<span className="asterisk-mark" aria-hidden="true" /></a><nav aria-label="Main navigation"><a href="#about">The person <span>01</span></a><a href="#work">The play <span>02</span></a><a href="#contact">Say hello <ArrowUpRight size={15}/></a></nav></header>
    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-meta mono"><span><i className="status-dot"/> Software engineer & product thinker</span><span>Los Angeles / Remote</span></div>
        <div className="hero-name"><h1 id="hero-title">Leon Yanagida<span className="name-dot">.</span></h1></div>
        <div className="hero-composition"><div className="hero-statement"><span className="eyebrow">A curious mind. An open canvas.</span><h2>Somewhere<br/>between <em>logic</em><br/>and a little<br/><span className="magic">magic<span className="asterisk"><span className="asterisk-mark" aria-hidden="true" /></span></span></h2><p>I build software. I think in systems.<br/>And I leave room for a little play.</p></div><div className="field-wrap"><Field paused={paused} noteEvent={noteEvent} performing={performing} onActivate={toggleMusic}/></div></div>
        <div className="hero-bottom"><a href="#about" className="explore mono"><span className="round-arrow"><ArrowDown size={19}/></span> A little more about me</a><span className="mono hero-footnote">PRODUCT INSTINCT. ENGINEERING MINDSET.</span><button className="motion-toggle mono" onClick={togglePause} aria-pressed={paused}>{paused ? <Play size={13}/> : <Pause size={13}/>} {paused ? "Resume motion" : "Pause motion"}</button></div>
      </section>
      <section className="about section-pad" id="about"><div className="section-label mono"><span>01 / THE PERSON</span><span>A LITTLE CONTEXT</span></div><h2 className="about-heading">Good software starts<br/>with <em>understanding.</em></h2><div className="about-grid"><span className="about-symbol" aria-hidden="true"><CornerDownRight size={130} strokeWidth={1.5}/></span><div><p className="intro">Hi, I’m Leon. I’m a software engineer who connects the product, technical, and business sides of an idea.</p><p>I do my best work close to both the product and the code. That’s where I can spot tradeoffs early, simplify workflows, and turn a good idea into something people actually use.</p><p>I care about solving a real problem and building something that stays useful as it grows.</p></div></div><Focus/></section>
      <section className="work section-pad" id="work"><div className="section-label mono"><span>02 / THE PLAY</span><span>INDEPENDENT PROJECT · EST. 2017</span></div><div className="work-title"><span className="eyebrow">SERIOUSLY USEFUL. SIMPLY FUN.</span><h2>Chrome Piano<span aria-hidden="true"><ArrowUpRight size={.68*120}/></span></h2></div><div className="work-story"><p>Not everything starts with a grand plan. Sometimes, you just want a piano in your browser.</p><div><p>A fun side project I built in 2017. A small idea that found its way into a lot of people’s everyday lives.</p><a className="text-link" href="https://chromewebstore.google.com/detail/chrome-piano/pjafcgbpdclmdeiipolenjgkikeldljl" target="_blank" rel="noopener noreferrer">Get the Chrome extension <ArrowUpRight size={18}/></a></div></div><div className="project-stats">{[["100K+","USERS"],["1M+","DOWNLOADS"],["∞","ROOM TO PLAY"]].map(([value,label]) => <div key={label}><span>{value}</span><span className="mono">{label}</span></div>)}</div></section>
    </main><footer className="contact section-pad" id="contact"><div className="section-label mono"><span>03 / SAY HELLO</span><span>LOS ANGELES / REMOTE</span></div><a className="hello" href="mailto:contact@leonyanagida.com">Let’s talk<span aria-hidden="true"><ArrowUpRight size={.68*120}/></span></a><a className="email" href="mailto:contact@leonyanagida.com">contact@leonyanagida.com</a><div className="footer-bottom mono"><span>© 2026 Leon Yanagida</span><a href="#top">Back to the beginning <ArrowUp size={13}/></a></div></footer>
    <MusicExperience enabled={performing} paused={paused} onExit={exitMusic} onPause={togglePause} onNote={onNote}/>
  </div>;
}
