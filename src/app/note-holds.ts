// Track input sources rather than only pitches: two fingers can hold one note.
export function updateHeldNotes(holds: Map<string, number>, source: string, note: number | null) {
  if (note === null) holds.delete(source);
  else holds.set(source, note);
  return Array.from(new Set(holds.values()));
}
