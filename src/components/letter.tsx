export type LetterColor = 'gray' | 'green' | 'yellow';

interface LetterProps {
  value?: string;
  color?: LetterColor;
}

const colorClasses: Record<LetterColor, string> = {
  gray: 'bg-warm-gray border-warm-gray text-cream',
  green: 'bg-olive border-olive text-cream',
  yellow: 'bg-terracotta border-terracotta text-cream',
};

export const Letter = ({ value, color }: LetterProps) => {
  const isEmpty = !value;
  return (
    <div
      className={[
        'flex items-center justify-center uppercase',
        'w-[var(--size)] h-[var(--size)]',
        'border-2 rounded-md font-bold transition-colors duration-200',
        color
          ? colorClasses[color]
          : isEmpty
            ? 'border-sand bg-transparent'
            : 'border-walnut/30 bg-transparent text-walnut',
      ].join(' ')}
    >
      {value}
    </div>
  );
};
