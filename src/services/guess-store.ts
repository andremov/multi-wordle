import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { isValid } from '../utils/words';

interface GuessState {
  current: string;
  guessList: string[];
  addLetter: (letter: string) => void;
  deleteLetter: () => void;
  submitGuess: () => void;
  resetGuesses: () => void;
}

export const useGuessStore = create<GuessState>()(
  persist(
    (set) => ({
      current: '',
      guessList: [],
      addLetter: (letter) =>
        set((s) => (s.current.length < 5 ? { current: s.current + letter } : s)),
      deleteLetter: () => set((s) => ({ current: s.current.slice(0, -1) })),
      submitGuess: () =>
        set((s) =>
          isValid(s.current)
            ? { guessList: [...s.guessList, s.current], current: '' }
            : s,
        ),
      resetGuesses: () => set({ guessList: [], current: '' }),
    }),
    { name: 'wordle_guesses' },
  ),
);
