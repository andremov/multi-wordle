import { useGuessStore } from '../services/guess-store';
import { Letter } from './letter';

export const CurrentGuessDisplay = () => {
  const guess = useGuessStore((s) => s.current);

  return (
    <div className="mx-auto w-[260px] flex items-center justify-between text-[32px] font-bold [--size:42px]">
      {[...guess.split(''), ...new Array(5 - guess.length)].map((item, key) => (
        <Letter key={key} value={item} />
      ))}
    </div>
  );
};
