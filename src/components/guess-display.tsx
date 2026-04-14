import { Letter, type LetterColor } from './letter';

export interface ParsedLetter {
  letter: string;
  color: LetterColor;
}

interface GuessDisplayProps {
  guess: ParsedLetter[];
}

export const GuessDisplay = ({ guess }: GuessDisplayProps) => (
  <div className="flex items-center justify-between mb-1 text-lg font-bold [--size:24px]">
    {guess.map((item, key) => (
      <Letter key={key} value={item.letter} color={item.color} />
    ))}
  </div>
);

export const BlankGuessDisplay = () => (
  <div className="flex items-center justify-between mb-1 text-lg font-bold [--size:24px]">
    {[...new Array(5)].map((_, key) => (
      <Letter key={key} />
    ))}
  </div>
);
