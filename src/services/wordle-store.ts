import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { dayKey, getDailyWordles } from '../utils/words';

export interface Wordle {
  solved: number;
  value: string;
  score: number;
}

interface WordleState {
  dayKey: string;
  wordleList: Wordle[];
  loadToday: (count: number) => { rollover: boolean };
  markSolved: (value: string, numGuesses: number) => void;
  updateScore: (value: string, score: number) => void;
}

const makeList = (count: number, key: string): Wordle[] =>
  getDailyWordles(count, key).map((value) => ({ solved: 0, value, score: 0 }));

export const useWordleStore = create<WordleState>()(
  persist(
    (set, get) => ({
      dayKey: '',
      wordleList: [],
      loadToday: (count) => {
        const today = dayKey();
        const current = get();
        if (current.dayKey === today && current.wordleList.length > 0) {
          return { rollover: false };
        }
        set({ dayKey: today, wordleList: makeList(count, today) });
        return { rollover: true };
      },
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
