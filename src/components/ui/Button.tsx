import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-unal-700 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-unal-700 text-white hover:bg-unal-800 dark:bg-unal-600 dark:hover:bg-unal-500 shadow-sm',
        lime:
          'bg-unal-300 text-unal-950 font-bold hover:bg-unal-400 dark:bg-unal-400 dark:text-slate-950 dark:hover:bg-unal-300 shadow-sm',
        secondary:
          'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:border-slate-700',
        outline:
          'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/80',
        ghost:
          'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 shadow-sm',
      },
      size: {
        sm: 'h-8 px-3 text-xs gap-1.5',
        default: 'h-10 px-4 py-2 text-sm gap-2',
        lg: 'h-12 px-6 text-base gap-2.5',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
