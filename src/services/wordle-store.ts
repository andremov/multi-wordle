import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getWordles } from '../utils/words';

export interface Wordle {
  solved: number;
  value: string;
  score: number;
}

interface WordleState {
  wordleList: Wordle[];
  loadWordles: (n: number) => void;
  resetWordles: (n: number) => void;
  markSolved: (value: string, numGuesses: number) => void;
  updateScore: (value: string, score: number) => void;
}

const makeList = (n: number): Wordle[] =>
  getWordles(n).map((value) => ({ solved: 0, value, score: 0 }));

export const useWordleStore = create<WordleState>()(
  persist(
    (set) => ({
      wordleList: [],
      loadWordles: (n) =>
        set((s) => (s.wordleList.length > 0 ? s : { wordleList: makeList(n) })),
      resetWordles: (n) => set({ wordleList: makeList(n) }),
      markSolved: (value, numGuesses) =>
        set((s) => ({
          wordleList: s.wordleList.map((w) =>
            w.value === value ? { ...w, solved: numGuesses } : w,
          ),
        })),
      updateScore: (value, score) =>
        set((s) => ({
          wordleList: s.wordleList.map((w) =>
            w.value === value ? { ...w, score } : w,
          ),
        })),
    }),
    { name: 'wordle_list' },
  ),
);
