import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

export const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-unal-700 text-white',
        unal:
          'bg-unal-50 text-unal-800 border border-unal-200',
        lime:
          'bg-unal-100 text-unal-900 border border-unal-300 font-bold',
        secondary:
          'bg-surface-200 text-slate-800',
        outline:
          'border border-slate-300 text-slate-700 bg-transparent',
        amber:
          'bg-amber-100 text-amber-900 border border-amber-300',
        success:
          'bg-emerald-100 text-emerald-900 border border-emerald-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}
