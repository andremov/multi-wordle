import { useEffect } from 'react';
import { BlankGuessDisplay, GuessDisplay } from './guess-display';
import { isSolved, parseGuess, wordleScore } from '../utils/words';
import { useWordleStore, type Wordle } from '../services/wordle-store';
import { useGuessStore } from '../services/guess-store';

interface GameProps {
  wordle: Wordle;
}

export const Game = ({ wordle }: GameProps) => {
  const guessList = useGuessStore((s) => s.guessList);
  const markSolved = useWordleStore((s) => s.markSolved);
  const updateScore = useWordleStore((s) => s.updateScore);

  useEffect(() => {
    if (isSolved(wordle.value, guessList)) {
      markSolved(wordle.value, guessList.length);
    } else {
      updateScore(wordle.value, wordleScore(wordle.value, guessList) ?? 0);
    }
  }, [guessList, wordle.value, markSolved, updateScore]);

  return (
    <div className="inline-block min-h-[70px] min-w-[268px] sm:min-w-[225px] md:min-w-[220px] lg:min-w-[224px] xl:min-w-[280px] box-border mr-[10px] last:mr-0 rounded-sm border border-neutral-400 px-4 py-2 dark:border-neutral-600">
      {guessList.length > 0 ? (
        guessList.map((item, key) => (
          <GuessDisplay
            key={key}
            guess={parseGuess(wordle.value.toLocaleUpperCase(), item)}
          />
        ))
      ) : (
        <BlankGuessDisplay />
      )}
    </div>
  );
};
