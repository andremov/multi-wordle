import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { TrophyIcon } from 'lucide-react';
import { Footer, GameResultDialog, Header, Text } from '@andremov/brand';
import { Toaster } from '@andremov/brand/ui/sonner';
import { CurrentGuessDisplay } from './components/current-guess-display';
import { InfoHeader } from './components/info-header';
import { Game } from './components/game';
import { useWordleStore } from './services/wordle-store';
import { useGuessStore } from './services/guess-store';
import { isSolved, isValid } from './utils/words';

const DAILY_COUNT = 100;

const bootDaily = () => {
  const { rollover } = useWordleStore.getState().loadToday(DAILY_COUNT);
  if (rollover) {
    useGuessStore.getState().resetGuesses();
  }
};

// one message at a time, replacing the last, like wordle-nextjs
const say = (msg: string, kind: 'success' | 'error') =>
  toast[kind](msg, { id: 'hundredle-message', duration: 2000 });

const App = () => {
  const wordleList = useWordleStore((s) => s.wordleList);
  const guessCount = useGuessStore((s) => s.guessList.length);
  const [shakeKey, setShakeKey] = useState(0);
  const [resultOpen, setResultOpen] = useState(false);

  useEffect(() => {
    bootDaily();

    const handleSubmit = () => {
      const current = useGuessStore.getState().current;
      if (current.length === 0) return;

      if (current.length < 5) {
        setShakeKey((k) => k + 1);
        say('Not enough letters', 'error');
        return;
      }

      if (!isValid(current)) {
        setShakeKey((k) => k + 1);
        say('Not in word list', 'error');
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
        say(msg, 'success');
        if (totalSolved === total) setResultOpen(true);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // shortcuts (Ctrl+R, Cmd+C) aren't letters, and keys pressed in the result dialog belong to it
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target instanceof Element && e.target.closest('[role="dialog"], button, a, input')) return;
      const guess = useGuessStore.getState();
      if (e.key === 'Backspace') {
        guess.deleteLetter();
      } else if (e.key === 'Enter') {
        // the guess that finishes the day opens the result dialog and focuses its button during this
        // keydown; without this, Enter's default action then clicks that button and shuts the dialog
        e.preventDefault();
        handleSubmit();
      } else {
        const value = e.key.toLocaleUpperCase();
        // only A to Z: punctuation and accented letters made a guess no board could match
        if (/^[A-Z]$/.test(value)) {
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
    <div className="flex min-h-screen select-none flex-col">
      <Toaster position="top-center" offset={64} />

      {/* brand 0.3.22's block Header is its own <header> landmark, so this wrapper is a plain div */}
      <div className="py-2">
        <Header variant="block" title="hundredle" />
      </div>

      <main className="flex flex-1 flex-col">
        <InfoHeader />
        <div key={shakeKey} className={shakeKey > 0 ? 'animate-shake' : ''}>
          <CurrentGuessDisplay />
        </div>

        <div className="flex flex-1 flex-wrap justify-center gap-2 px-4 pb-6">
          {activeWordles.map((item) => (
            <Game wordle={item} key={item.value} />
          ))}
          {wordleList.length > 0 && activeWordles.length === 0 && (
            <Text variant="title">Done for today.</Text>
          )}
        </div>
      </main>

      <GameResultDialog
        open={resultOpen}
        onOpenChange={setResultOpen}
        icon={<TrophyIcon />}
        title="Done for today!"
        description={`All ${wordleList.length} boards solved. A new hundred tomorrow.`}
        stats={[{ label: 'Guesses', value: guessCount }]}
      />

      <footer className="flex justify-center py-4">
        <Footer variant="minimal" />
      </footer>
    </div>
  );
};

export default App;
