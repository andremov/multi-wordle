import { useEffect, useMemo } from 'react';
import { BlankGuessDisplay, GuessDisplay } from './guess-display';
import {
  getSolvedLetters,
  isSolved,
  parseGuess,
  wordleScore,
} from '../utils/words';
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

  const solvedLetters = useMemo(
    () => getSolvedLetters(wordle.value, guessList),
    [wordle.value, guessList],
  );

  return (
    <div className="box-border flex min-w-[170px] flex-col rounded-md border border-sand bg-cream-tinted/60 px-3 py-2">
      <div className="mb-2 flex items-center justify-center gap-1">
        {solvedLetters.map((letter, i) => (
          <span
            key={i}
            className={`inline-flex h-5 w-5 items-center justify-center rounded-sm text-[10px] font-bold uppercase ${
              letter
                ? 'bg-olive text-cream'
                : 'border border-sand text-walnut/30'
            }`}
          >
            {letter ?? ''}
          </span>
        ))}
      </div>
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
