import { useToastStore, type ToastVariant } from '../services/toast-store';

const variantStyles: Record<ToastVariant, string> = {
  info: 'bg-walnut text-cream',
  success: 'bg-olive text-cream',
  error: 'bg-terracotta text-cream',
};

export const Toaster = () => {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <div className="pointer-events-none fixed top-4 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`rounded-md px-4 py-2 text-sm font-bold shadow-lg ${variantStyles[t.variant]}`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
};
