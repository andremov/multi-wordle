import { StatGroup, StatTile } from '@andremov/brand';
import { useWordleStore } from '../services/wordle-store';
import { useGuessStore } from '../services/guess-store';

export const InfoHeader = () => {
  const wordleList = useWordleStore((s) => s.wordleList);
  const today = useWordleStore((s) => s.dayKey);
  const guessList = useGuessStore((s) => s.guessList);

  const activeCount = wordleList.filter((i) => i.solved === 0).length;

  return (
    <StatGroup className="mx-auto mt-4 mb-4 justify-center">
      <StatTile size="sm" tone="brand" label="Active" value={`${activeCount}/${wordleList.length}`} />
      <StatTile size="sm" label="Guesses" value={guessList.length} />
      <StatTile size="sm" label="Day" value={today} />
    </StatGroup>
  );
};
