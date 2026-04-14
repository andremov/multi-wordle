import { useGuessStore } from '../services/guess-store';
import { Letter } from './letter';

export const CurrentGuessDisplay = () => {
  const guess = useGuessStore((s) => s.current);

  return (
    <div className="mx-auto mb-4 flex w-[260px] items-center justify-between text-2xl font-bold [--size:42px]">
      {[...guess.split(''), ...new Array(5 - guess.length)].map((item, key) => (
        <Letter key={key} value={item} />
      ))}
    </div>
  );
};
