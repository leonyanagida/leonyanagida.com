export type MelodyNote = { beat: number; index: number; octave: number; velocity: number };

// An original twelve-bar miniature: a quiet melody over broken seventh chords.
// Indices refer to the instrument's chromatic C4 to C5 octave.
const phrases = [
  [4, 7, 11, 12, 7, 4], [9, 12, 11, 7, 4, 2],
  [5, 9, 12, 9, 7, 4], [2, 7, 9, 11, 7, 2],
  [4, 7, 11, 7, 4, 2], [0, 4, 9, 12, 11, 9],
  [5, 9, 7, 4, 2, 0], [2, 7, 11, 12, 11, 7],
  [4, 7, 12, 11, 7, 4], [5, 9, 12, 9, 7, 5],
  [2, 5, 7, 11, 7, 2], [0, 4, 7, 12],
];
const harmony = [
  [0, 7, 4, 11], [9, 4, 0, 7], [5, 0, 9, 4], [7, 2, 5, 11],
  [4, 11, 7, 2], [9, 4, 0, 7], [5, 0, 9, 4], [7, 2, 5, 11],
  [0, 7, 4, 11], [5, 0, 9, 4], [7, 2, 5, 11], [0, 7, 4, 0],
];
export const melody: MelodyNote[] = phrases.flatMap((phrase, bar) => {
  const offsets = phrase.length === 4 ? [0, 1, 2, 3] : [0, .75, 1.5, 2, 2.75, 3.5];
  return [
    ...phrase.map((index, i) => ({ beat: bar * 4 + offsets[i], index, octave: 0, velocity: i === 0 ? .8 : .66 })),
    ...harmony[bar].map((index, i) => ({ beat: bar * 4 + i + .08, index, octave: -1, velocity: .3 })),
  ];
}).sort((a, b) => a.beat - b.beat);
export const melodyBeatSeconds = 60 / 76;
