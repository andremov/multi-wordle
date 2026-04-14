import { useEffect } from 'react';
import { CurrentGuessDisplay } from './components/current-guess-display';
import { InfoHeader } from './components/info-header';
import { Game } from './components/game';
import { useWordleStore } from './services/wordle-store';
import { useGuessStore } from './services/guess-store';

const App = () => {
  const wordleList = useWordleStore((s) => s.wordleList);

  useEffect(() => {
    useWordleStore.getState().loadWordles(1);

    const handleKeyDown = (e: KeyboardEvent) => {
      const guess = useGuessStore.getState();
      if (e.key === 'Backspace') {
        guess.deleteLetter();
      } else if (e.key === 'Enter') {
        guess.submitGuess();
      } else {
        const value = e.key.toLocaleUpperCase();
        if (value.length === 1 && Number.isNaN(Number.parseInt(value))) {
          guess.addLetter(value);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeWordles = wordleList
    .filter((i) => i.solved === 0)
    .sort((a, b) => b.score - a.score);

  return (
    <div className="box-border min-h-screen w-[300px] sm:w-[500px] md:w-[720px] lg:w-[1200px] xl:w-full xl:max-w-full xl:min-w-[98vw] bg-black/30 px-4 pt-4 pb-8 shadow-[0_0_2px_2px_rgba(0,0,0,0.125)]">
      <InfoHeader />
      <CurrentGuessDisplay />
      <div className="mt-4 flex overflow-x-auto pb-4">
        {activeWordles.map((item, key) => (
          <Game wordle={item} key={key} />
        ))}
        {activeWordles.length === 0 && <div>Done.</div>}
      </div>
    </div>
  );
};

export default App;
