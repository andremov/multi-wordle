export type LetterColor = 'gray' | 'green' | 'yellow';

interface LetterProps {
  value?: string;
  color?: LetterColor;
}

const colorClasses: Record<LetterColor, string> = {
  gray: 'text-neutral-400/60',
  green: 'bg-wordle-green text-white',
  yellow: 'bg-wordle-yellow text-white',
};

export const Letter = ({ value, color }: LetterProps) => {
  const isEmpty = !value;
  return (
    <div
      className={[
        'flex items-center justify-center',
        'w-[var(--size)] h-[var(--size)]',
        'border-2 rounded-[5px] transition-transform duration-200',
        isEmpty
          ? 'scale-[0.7] border-slate-400/25'
          : 'border-slate-400/50',
        color ? colorClasses[color] : '',
      ].join(' ')}
    >
      <span className="flex items-center justify-center w-0 h-0">{value}</span>
    </div>
  );
};
