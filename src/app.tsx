import { useEffect, useState } from 'react';
import { CurrentGuessDisplay } from './components/current-guess-display';
import { InfoHeader } from './components/info-header';
import { Game } from './components/game';
import { Toaster } from './components/toaster';
import { useWordleStore } from './services/wordle-store';
import { useGuessStore } from './services/guess-store';
import { useToastStore } from './services/toast-store';
import { isSolved, isValid } from './utils/words';

const DAILY_COUNT = 100;

const bootDaily = () => {
  const { rollover } = useWordleStore.getState().loadToday(DAILY_COUNT);
  if (rollover) {
    useGuessStore.getState().resetGuesses();
  }
};

const App = () => {
  const wordleList = useWordleStore((s) => s.wordleList);
  const [shakeKey, setShakeKey] = useState(0);

  useEffect(() => {
    bootDaily();

    const handleSubmit = () => {
      const current = useGuessStore.getState().current;
      if (current.length === 0) return;

      if (current.length < 5) {
        setShakeKey((k) => k + 1);
        useToastStore.getState().push('Not enough letters', 'error');
        return;
      }

      if (!isValid(current)) {
        setShakeKey((k) => k + 1);
        useToastStore.getState().push('Not in word list', 'error');
        return;
      }

      const before = useWordleStore.getState().wordleList;
      useGuessStore.getState().submitGuess();
      const newGuessList = useGuessStore.getState().guessList;

      const newlySolved = before.filter(
        (w) => w.solved === 0 && isSolved(w.value, newGuessList),
      );

      if (newlySolved.length > 0) {
        const alreadySolved = before.filter((w) => w.solved > 0).length;
        const totalSolved = alreadySolved + newlySolved.length;
        const total = before.length;
        const msg =
          newlySolved.length === 1
            ? `Solved! ${totalSolved}/${total}`
            : `${newlySolved.length} solved! ${totalSolved}/${total}`;
        useToastStore.getState().push(msg, 'success');
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const guess = useGuessStore.getState();
      if (e.key === 'Backspace') {
        guess.deleteLetter();
      } else if (e.key === 'Enter') {
        handleSubmit();
      } else {
        const value = e.key.toLocaleUpperCase();
        if (value.length === 1 && Number.isNaN(Number.parseInt(value))) {
          guess.addLetter(value);
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') bootDaily();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const activeWordles = wordleList
    .filter((i) => i.solved === 0)
    .sort((a, b) => b.score - a.score);

  return (
    <main className="flex min-h-screen select-none flex-col bg-cream text-walnut">
      <Toaster />

      <header className="flex w-full items-center justify-center gap-3 border-b border-sand py-3">
        <img src="/logo.svg" alt="" className="h-8 w-8 -rotate-12" />
        <h1 className="font-serif text-3xl font-bold">hundredle</h1>
      </header>

      <InfoHeader />
      <div key={shakeKey} className={shakeKey > 0 ? 'animate-shake' : ''}>
        <CurrentGuessDisplay />
      </div>

      <div className="flex flex-1 flex-wrap justify-center gap-2 px-4 pb-6">
        {activeWordles.map((item, key) => (
          <Game wordle={item} key={key} />
        ))}
        {activeWordles.length === 0 && (
          <div className="font-serif text-xl">Done for today.</div>
        )}
      </div>

      <footer className="mt-auto flex justify-center border-t border-sand py-4">
        <a
          href="https://andremov.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-warm-gray transition-colors duration-200 hover:text-terracotta"
        >
          Built by Andrés Movilla
        </a>
      </footer>
    </main>
  );
};

export default App;
