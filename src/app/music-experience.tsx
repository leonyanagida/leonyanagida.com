"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { drawNoteLight } from "./music-light";
import { updateHeldNotes } from "./note-holds";
import { melody, melodyBeatSeconds } from "./melody";
import { advanceSpring, type Spring } from "./motion-spring";
import { Pause, Play, Square, Volume2, VolumeX, X } from "lucide-react";

export type NoteEvent = { index: number; sequence: number };
export const notes = [
  { name: "C", key: "A", frequency: 261.63, row: 0 },
  { name: "C♯", key: "W", frequency: 277.18, row: 0 },
  { name: "D", key: "S", frequency: 293.66, row: 1 },
  { name: "D♯", key: "E", frequency: 311.13, row: 1 },
  { name: "E", key: "D", frequency: 329.63, row: 2 },
  { name: "F", key: "F", frequency: 349.23, row: 3 },
  { name: "F♯", key: "T", frequency: 369.99, row: 3 },
  { name: "G", key: "G", frequency: 392, row: 4 },
  { name: "G♯", key: "Y", frequency: 415.3, row: 4 },
  { name: "A", key: "H", frequency: 440, row: 5 },
  { name: "A♯", key: "U", frequency: 466.16, row: 5 },
  { name: "B", key: "J", frequency: 493.88, row: 6 },
  { name: "C′", key: "K", frequency: 523.25, row: 7 },
];
const naturalIndices = [0, 2, 4, 5, 7, 9, 11, 12];
// Chromatic pitch positions projected onto the eight visible natural keys.
// Sharps sit between their neighbouring anchors instead of borrowing a column.
const pianoPositions = [0, .5, 1, 1.5, 2, 3, 3.5, 4, 4.5, 5, 5.5, 6, 7];
type Voice = { gain: GainNode; oscillators: OscillatorNode[] };
type HeadingSpring = Spring & { originalTranslate: string; originalWillChange: string };
type Echo = { born: number; index: number; x: number; y: number };

export default function MusicExperience({ enabled, paused, onExit, onPause, onNote }: {
  enabled: boolean; paused: boolean; onExit: () => void; onPause: () => void;
  onNote: (index: number) => void;
}) {
  const [autoPlaying, setAutoPlaying] = useState(false);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoGeneration = useRef(0);
  const [muted, setMuted] = useState(false);
  const [lastNote, setLastNote] = useState<number | null>(null);
  const [activeNotes, setActiveNotes] = useState<number[]>([]);
  const heldNotes = useRef(new Map<string, number>());
  const highlightTimers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const highlightSequence = useRef(0);
  const [error, setError] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const ribbon = useRef<HTMLDivElement>(null);
  const context = useRef<AudioContext | null>(null);
  const voices = useRef<Voice[]>([]);
  const echoes = useRef<Echo[]>([]);
  const touches = useRef(new Map<number, number>());
  const headingSprings = useRef(new Map<HTMLElement, HeadingSpring>());
  const reduce = useRef(false);
  const live = useRef(false);
  const mutedRef = useRef(false);
  live.current = enabled;
  mutedRef.current = muted;

  const holdNote = useCallback((source: string, index: number | null) => {
    setActiveNotes(updateHeldNotes(heldNotes.current, source, index));
  }, []);

  const clearHolds = useCallback((prefix = "") => {
    heldNotes.current.forEach((_, source) => {
      if (source.startsWith(prefix)) heldNotes.current.delete(source);
    });
    highlightTimers.current.forEach((timer, source) => {
      if (source.startsWith(prefix)) { clearTimeout(timer); highlightTimers.current.delete(source); }
    });
    setActiveNotes(Array.from(new Set(heldNotes.current.values())));
  }, []);

  const pulseNote = useCallback((index: number, prefix: string) => {
    const source = `${prefix}:${highlightSequence.current++}`;
    holdNote(source, index);
    highlightTimers.current.set(source, setTimeout(() => {
      highlightTimers.current.delete(source);
      holdNote(source, null);
    }, 400));
  }, [holdNote]);

  useEffect(() => {
    const timers = highlightTimers.current;
    return () => { timers.forEach(clearTimeout); timers.clear(); };
  }, []);

  const silence = useCallback(() => {
    const audio = context.current;
    voices.current.forEach(voice => {
      if (audio) {
        voice.gain.gain.cancelScheduledValues(audio.currentTime);
        voice.gain.gain.setTargetAtTime(0, audio.currentTime, .015);
        voice.oscillators.forEach(oscillator => { try { oscillator.stop(audio.currentTime + .06); } catch {} });
      }
    });
    voices.current = [];
  }, []);

  const stopMelody = useCallback(() => {
    autoGeneration.current += 1;
    if (autoTimer.current !== null) clearTimeout(autoTimer.current);
    autoTimer.current = null;
    setAutoPlaying(false);
    clearHolds("auto:");
    silence();
  }, [silence, clearHolds]);

  useEffect(() => {
    if (!enabled) stopMelody();
    const hidden = () => { if (document.hidden) { stopMelody(); clearHolds(); touches.current.clear(); } };
    document.addEventListener("visibilitychange", hidden);
    return () => document.removeEventListener("visibilitychange", hidden);
  }, [enabled, stopMelody, clearHolds]);

  useEffect(() => () => {
    autoGeneration.current += 1;
    if (autoTimer.current !== null) clearTimeout(autoTimer.current);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { reduce.current = query.matches; };
    update(); query.addEventListener("change", update);
    return () => { query.removeEventListener("change", update); silence(); void context.current?.close(); };
  }, [silence]);

  useEffect(() => {
    if (!enabled || muted) silence();
    if (!enabled) {
      echoes.current = [];
      touches.current.clear();
      clearHolds();
      setLastNote(null);
    }
  }, [enabled, muted, silence, clearHolds]);

  useEffect(() => {
    let frame = 0;
    let previous = performance.now();
    const springs = headingSprings.current;
    const restore = () => {
      springs.forEach((spring, element) => {
        element.style.translate = spring.originalTranslate;
        element.style.willChange = spring.originalWillChange;
      });
      springs.clear();
    };
    const tick = (now: number) => {
      const dt = Math.min((now - previous) / 1000, .05);
      previous = now;
      if (reduce.current) restore();
      else if (!paused && !document.hidden) {
        springs.forEach((spring, element) => {
          if (!enabled) { spring.targetX = 0; spring.targetY = 0; }
          advanceSpring(spring, dt);
          element.style.translate = `${spring.x.toFixed(3)}px ${spring.y.toFixed(3)}px`;
          if (Math.abs(spring.x) + Math.abs(spring.y) + Math.abs(spring.vx) + Math.abs(spring.vy)
              + Math.abs(spring.targetX) + Math.abs(spring.targetY) < .015) {
            element.style.translate = spring.originalTranslate;
            element.style.willChange = spring.originalWillChange;
            springs.delete(element);
          }
        });
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    // Preserve spring state when the pause or performance controls change.
    return () => cancelAnimationFrame(frame);
  }, [enabled, paused]);

  useEffect(() => {
    const springs = headingSprings.current;
    return () => {
      springs.forEach((spring, element) => {
        element.style.translate = spring.originalTranslate;
        element.style.willChange = spring.originalWillChange;
      });
    };
  }, []);

  const play = useCallback(async (index: number, origin?: { x: number; y: number }, performanceNote?: { octave: number; velocity: number; generation: number }) => {
    if (!live.current) return;
    if (!performanceNote && autoTimer.current !== null) stopMelody();
    const note = notes[index];
    if (performanceNote) pulseNote(index, "auto");
    const showNote = !performanceNote || performanceNote.octave === 0;
    if (showNote) setLastNote(index);
    if (showNote) onNote(note.row);
    const ribbonRect = ribbon.current?.getBoundingClientRect();
    const position = pianoPositions[index] ?? note.row;
    const leftIndex = Math.floor(position);
    const rightIndex = Math.ceil(position);
    const leftKey = ribbon.current?.children.item(leftIndex)?.getBoundingClientRect();
    const rightKey = ribbon.current?.children.item(rightIndex)?.getBoundingClientRect();
    const leftCenter = leftKey ? leftKey.left + leftKey.width / 2 : undefined;
    const rightCenter = rightKey ? rightKey.left + rightKey.width / 2 : undefined;
    const x = leftCenter !== undefined && rightCenter !== undefined
      ? leftCenter + (rightCenter - leftCenter) * (position - leftIndex)
      : ribbonRect
        ? ribbonRect.left + ribbonRect.width * ((position + .5) / 8)
        : origin?.x ?? window.innerWidth / 2;
    const y = leftKey?.top ?? ribbonRect?.top ?? window.innerHeight - 120;
    if (showNote && !paused && !reduce.current) {
      echoes.current.push({ born: performance.now(), index, x, y });
      echoes.current = echoes.current.slice(-8);
      document.querySelectorAll<HTMLElement>(".hero-name h1, .hero-statement h2, .about-heading, .work-title h2, .hello, .project-stats > div > span:first-child").forEach((element, i) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        let spring = headingSprings.current.get(element);
        if (!spring) {
          spring = { x: 0, y: 0, vx: 0, vy: 0, targetX: 0, targetY: 0,
            originalTranslate: element.style.translate, originalWillChange: element.style.willChange };
          headingSprings.current.set(element, spring);
          element.style.willChange = "translate";
        }
        // Retarget without cancelling the movement or resetting its velocity.
        // Pitch adds a subtle sideways drift, like a phrase passing through the type.
        spring.targetX = (note.row - 3.5) * .85 * (i % 2 ? -1 : 1);
        spring.targetY = -(9 + note.row * 1.2) * (i % 2 ? .8 : 1);
      });
    }
    if (mutedRef.current) return;
    try {
      if (!context.current) context.current = new AudioContext();
      const audio = context.current;
      if (audio.state === "suspended") await audio.resume();
      if (!live.current || mutedRef.current || (performanceNote && performanceNote.generation !== autoGeneration.current)) return;
      // Bound polyphony when someone sweeps rapidly across the touch ribbon.
      if (voices.current.length >= 12) {
        const oldest = voices.current.shift();
        oldest?.oscillators.forEach(oscillator => { try { oscillator.stop(); } catch {} });
      }
      const now = audio.currentTime;
      const gain = audio.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(.105 * (performanceNote?.velocity ?? 1), now + .018);
      gain.gain.exponentialRampToValueAtTime(.001, now + 1.8);
      gain.connect(audio.destination);
      const oscillators = [1, 2, 3].map((harmonic, i) => {
        const oscillator = audio.createOscillator();
        const partial = audio.createGain();
        oscillator.frequency.value = note.frequency * harmonic * 2 ** (performanceNote?.octave ?? 0);
        partial.gain.value = [1, .18, .045][i];
        oscillator.connect(partial); partial.connect(gain);
        oscillator.start(now); oscillator.stop(now + 1.9);
        oscillator.onended = () => {
          oscillator.disconnect(); partial.disconnect();
          if (i === 2) { gain.disconnect(); voices.current = voices.current.filter(voice => voice.gain !== gain); }
        };
        return oscillator;
      });
      voices.current.push({ gain, oscillators });
    } catch { setError(true); stopMelody(); }
  }, [onNote, paused, stopMelody, pulseNote]);

  const latestPlay = useRef(play);
  latestPlay.current = play;
  const startMelody = useCallback(() => {
    stopMelody();
    setAutoPlaying(true);
    const generation = autoGeneration.current;
    const started = performance.now();
    let cursor = 0;
    const next = () => {
      if (generation !== autoGeneration.current || !live.current) return;
      const event = melody[cursor];
      if (!event) { setAutoPlaying(false); autoTimer.current = null; return; }
      void latestPlay.current(event.index, undefined, { ...event, generation });
      cursor += 1;
      const nextBeat = melody[cursor]?.beat;
      const due = nextBeat === undefined ? performance.now() + 2200 : started + nextBeat * melodyBeatSeconds * 1000;
      autoTimer.current = setTimeout(next, Math.max(0, due - performance.now()));
    };
    next();
  }, [stopMelody]);

  useEffect(() => {
    if (!enabled) return;
    const down = (event: KeyboardEvent) => {
      if (event.key === "Escape") { onExit(); return; }
      if (event.repeat || event.ctrlKey || event.metaKey || event.altKey || event.isComposing) return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || target.closest("input, textarea, select, [role='textbox']"))) return;
      const index = notes.findIndex(note => note.key === event.key.toUpperCase());
      if (index >= 0) {
        event.preventDefault();
        holdNote(`keyboard:${event.code || event.key.toUpperCase()}`, index);
        void play(index);
      }
    };
    const up = (event: KeyboardEvent) => {
      const source = `keyboard:${event.code || event.key.toUpperCase()}`;
      if (heldNotes.current.has(source)) holdNote(source, null);
    };
    const blur = () => { stopMelody(); touches.current.clear(); clearHolds(); };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); window.removeEventListener("blur", blur); };
  }, [enabled, onExit, play, stopMelody, holdNote, clearHolds]);

  useEffect(() => {
    if (!enabled || !canvas.current) return;
    const el = canvas.current;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    let frame = 0, width = 0, height = 0;
    const resize = () => {
      width = window.innerWidth; height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      el.width = width * dpr; el.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      echoes.current = echoes.current.filter(echo => now - echo.born < 3600);
      if (!paused && !reduce.current && !document.hidden) {
        for (const echo of echoes.current) {
          drawNoteLight(ctx, width, height, (now - echo.born) / 3600,
            notes[echo.index].row, echo.x, echo.y, echoes.current.length);
        }
      }
      frame = requestAnimationFrame(draw);
    };
    resize(); window.addEventListener("resize", resize); frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, [enabled, paused]);

  if (!enabled) return null;
  return <>
    <canvas className="music-atmosphere" ref={canvas} aria-hidden="true" />
    <aside className="music-console" aria-label="Code into Music controls">
      <div className="music-console-top"><span className="music-console-title"><i className="status-dot"/> THE PAGE IS YOUR INSTRUMENT</span><div className="music-actions">
        <button onClick={onPause} aria-label={paused ? "Resume visual motion" : "Pause visual motion"}>{paused ? <Play size={16}/> : <Pause size={16}/>}</button>
        <button onClick={() => setMuted(!muted)} aria-label={muted ? "Unmute instrument" : "Mute instrument"} aria-pressed={muted}>{muted ? <VolumeX size={16}/> : <Volume2 size={16}/>}</button>
        <button onClick={onExit} aria-label="Exit music experience"><X size={19}/></button>
      </div></div>
      <div className="melody-control"><div><span>Between the lines</span><span className="melody-description">An original little piano piece</span></div><button onClick={autoPlaying ? stopMelody : startMelody} aria-pressed={autoPlaying}>{autoPlaying ? <Square size={13}/> : <Play size={13}/>} {autoPlaying ? "Stop melody" : "Play a melody"}</button></div>
      <div ref={ribbon} className="music-ribbon" role="group" aria-label="Musical touch ribbon. Tap notes or slide across to play." onPointerDown={event => {
        if (event.button !== 0) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const position = Math.max(0, Math.min(7, Math.floor((event.clientX - rect.left) / rect.width * 8)));
        touches.current.set(event.pointerId, position);
        holdNote(`pointer:${event.pointerId}`, naturalIndices[position]);
        event.currentTarget.setPointerCapture(event.pointerId);
        void play(naturalIndices[position], { x: event.clientX, y: window.innerHeight * .5 });
      }} onPointerMove={event => {
        if (!touches.current.has(event.pointerId)) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const position = Math.max(0, Math.min(7, Math.floor((event.clientX - rect.left) / rect.width * 8)));
        if (touches.current.get(event.pointerId) !== position) {
          touches.current.set(event.pointerId, position);
          holdNote(`pointer:${event.pointerId}`, naturalIndices[position]);
          void play(naturalIndices[position], { x: event.clientX, y: window.innerHeight * .5 });
        }
      }} onPointerUp={event => { touches.current.delete(event.pointerId); holdNote(`pointer:${event.pointerId}`, null); }} onPointerCancel={event => { touches.current.delete(event.pointerId); holdNote(`pointer:${event.pointerId}`, null); }} onLostPointerCapture={event => { touches.current.delete(event.pointerId); holdNote(`pointer:${event.pointerId}`, null); }}>
        {naturalIndices.map(index => <button key={index} className={activeNotes.includes(index) ? "sounding" : ""} aria-label={`Play ${notes[index].name}, keyboard ${notes[index].key}`} onClick={event => { if (event.detail === 0) { pulseNote(index, "accessible"); void play(index); } }}><span className="ribbon-key">{notes[index].key}</span><span className="ribbon-string"/><span className="ribbon-note">{notes[index].name}</span></button>)}
      </div>
      <div className="music-console-bottom"><span className="desktop-instruction">Play A S D F G H J K · Playing a key takes over</span><span className="touch-instruction">Slide across the strings. Try two fingers.</span><span role="status">{error ? "Audio unavailable" : lastNote === null ? "YOUR FIRST NOTE?" : `${notes[lastNote].name} · ${Math.round(notes[lastNote].frequency)} Hz`}</span></div>
    </aside>
  </>;
}
