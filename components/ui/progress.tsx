'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

interface ProgressProps {
  value?: number;
  className?: string;
}

const Progress = React.forwardRef<
  HTMLDivElement,
  ProgressProps
>(({ className, value = 0, ...props }, ref) => {
  const percentage = Math.min(Math.max(value, 0), 100);

  return (
    <div
      ref={ref}
      className={cn(
        'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
        className
      )}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  );
});

Progress.displayName = 'Progress';

export { Progress };
