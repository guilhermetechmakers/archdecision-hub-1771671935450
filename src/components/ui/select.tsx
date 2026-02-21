import { type SelectHTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'
import { AlertCircle, ChevronDown } from 'lucide-react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
  hideLabel?: boolean
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, hideLabel, id, ...props }, ref) => {
    const generatedId = useId()
    const selectId = id || generatedId
    const errorId = error ? `${selectId}-error` : undefined

    return (
      <div className="relative w-full">
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              'mb-1.5 block text-sm font-medium text-foreground',
              hideLabel && 'sr-only'
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            className={cn(
              'flex h-10 w-full appearance-none rounded-lg border border-input bg-background px-3 py-2 pr-8 text-sm text-foreground ring-offset-background transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'placeholder:text-muted-foreground',
              error && 'border-destructive focus-visible:ring-destructive',
              className
            )}
            ref={ref}
            aria-invalid={error ? true : undefined}
            aria-describedby={errorId}
            aria-label={!label ? (placeholder || undefined) : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        {error && (
          <p id={errorId} role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-destructive">
            <AlertCircle className="h-3 w-3 shrink-0" />
            {error}
          </p>
        )}
      </div>
    )
  }
)
Select.displayName = 'Select'

export { Select }
export type { SelectProps }
