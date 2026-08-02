import { cn } from '@/utils/cn'

type CorporateDecorationProps = {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'h-20 w-20',
  md: 'h-28 w-28',
  lg: 'h-36 w-36 sm:h-40 sm:w-40',
}

/**
 * Recreates the business-card corner language:
 * diagonal orange + steel + graphite stripes.
 */
export function CorporateDecoration({
  className,
  size = 'md',
}: CorporateDecorationProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute overflow-hidden',
        sizes[size],
        className,
      )}
      aria-hidden="true"
    >
      {/* Graphite wedge */}
      <span
        className="absolute -bottom-[35%] -right-[40%] h-[160%] w-[78%] origin-bottom-right -rotate-[32deg] bg-graphite"
      />
      {/* Steel stripe */}
      <span
        className="absolute -bottom-[40%] right-[28%] h-[170%] w-[11px] origin-bottom-right -rotate-[32deg] bg-steel-light"
      />
      {/* Orange stripe */}
      <span
        className="absolute -bottom-[40%] right-[36%] h-[170%] w-[14px] origin-bottom-right -rotate-[32deg] bg-orange"
      />
      {/* Thin dark accent line */}
      <span
        className="absolute -bottom-[40%] right-[43%] h-[170%] w-[2px] origin-bottom-right -rotate-[32deg] bg-ink/35"
      />
    </div>
  )
}

export function TopAccentBar({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex h-[3px] w-full overflow-hidden', className)}
      aria-hidden="true"
    >
      <span className="w-[56%] bg-graphite" />
      <span className="w-[16%] bg-steel-light" />
      <span className="w-[28%] bg-orange" />
    </div>
  )
}
