import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn('rounded-full object-cover', sizes[size], className)}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <div
      className={cn(
        'rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center font-semibold text-brand-400',
        sizes[size],
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
}
