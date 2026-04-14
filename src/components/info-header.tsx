import { useWordleStore } from '../services/wordle-store';
import { useGuessStore } from '../services/guess-store';

export const InfoHeader = () => {
  const wordleList = useWordleStore((s) => s.wordleList);
  const today = useWordleStore((s) => s.dayKey);
  const guessList = useGuessStore((s) => s.guessList);

  const activeCount = wordleList.filter((i) => i.solved === 0).length;

  return (
    <div className="mx-auto mt-4 mb-2 flex w-full max-w-[320px] items-center justify-between text-sm text-warm-gray">
      <div>
        <div className="font-semibold text-walnut">
          Active {activeCount}/{wordleList.length}
        </div>
        <div>Guesses {guessList.length}</div>
      </div>
      <div className="font-serif text-walnut">{today}</div>
    </div>
  );
};
