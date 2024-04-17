'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  let marginLeftValue = '';
  if (value === 100) {
    marginLeftValue = `calc(${value}% - 0.75rem)`;
  } else {
    marginLeftValue = `${value}%`;
  }

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-3 w-full overflow-hidden rounded-full bg-secondary',
        className,
      )}
      {...props}>
      <ProgressPrimitive.Indicator
        className='h-3 w-3 flex-1 rounded-full bg-primary shadow-lg shadow-white ring-2 dark:ring-grey-500'
        style={{ marginLeft: marginLeftValue }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
