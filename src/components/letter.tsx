// andremov-brand-check-unique: the game's letter tiles and their status colours
export type LetterColor = 'gray' | 'green' | 'yellow';

interface LetterProps {
  value?: string;
  color?: LetterColor;
}

// The game's colours are content: olive / ochre / warm grey at full strength in both themes, solid,
// with white letters (the same tiles the user approved for wordle-nextjs).
const colorClasses: Record<LetterColor, string> = {
  // andremov-brand-check-ignore: game colour (wrong letter), darker in dark so it stays below the board
  gray: 'bg-[#7a6b63] border-[#7a6b63] dark:bg-[#51423c] dark:border-[#51423c] text-white',
  // andremov-brand-check-ignore: game colour (right letter), the same in both themes
  green: 'bg-[#6b7f5e] border-[#6b7f5e] text-white',
  // andremov-brand-check-ignore: game colour (misplaced letter), the same in both themes
  yellow: 'bg-[#bb914e] border-[#bb914e] text-white',
};

export const Letter = ({ value, color }: LetterProps) => {
  const isEmpty = !value;
  return (
    <div
      className={[
        'flex items-center justify-center uppercase',
        'w-[var(--size)] h-[var(--size)]',
        // the brand's rounded-md (12px) turns these 26px tiles into circles; 6px is the old square-ish tile
        'border-2 rounded-[6px] font-bold transition-colors duration-200',
        color
          ? colorClasses[color]
          : isEmpty
            ? 'border-border bg-transparent'
            : 'border-foreground/30 bg-transparent text-foreground',
      ].join(' ')}
    >
      {value}
    </div>
  );
};
