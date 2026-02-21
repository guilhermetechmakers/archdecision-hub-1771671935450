import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/ui/empty-state'
import { formatCurrency, cn } from '@/lib/utils'
import type { DecisionOption } from '@/types'
import {
  Check, X, Star, DollarSign, ThumbsUp, ThumbsDown,
  FileText, Image, ZoomIn, Layers, Plus,
} from 'lucide-react'

interface ComparisonPanelProps {
  options: DecisionOption[]
  selectedOptionId: string | null
  onSelectOption: (optionId: string) => void
  isReadOnly?: boolean
  isLoading?: boolean
  onAddOption?: () => void
}

function ComparisonPanelSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-5 pt-7 space-y-4">
              <Skeleton className="h-36 w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-3">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-1.5 w-full rounded-full" />
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-16 ml-auto" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function ComparisonPanel({
  options,
  selectedOptionId,
  onSelectOption,
  isReadOnly = false,
  isLoading = false,
  onAddOption,
}: ComparisonPanelProps) {
  if (isLoading) {
    return <ComparisonPanelSkeleton />
  }

  if (options.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card">
        <EmptyState
          icon={<Layers className="h-8 w-8" />}
          title="No options to compare"
          description="Add design options with images, costs, and pros/cons to create a visual comparison for client review."
          action={
            onAddOption && !isReadOnly
              ? { label: 'Add First Option', onClick: onAddOption }
              : undefined
          }
          className="py-12"
        />
      </div>
    )
  }

  const recommendedOption = options.find((o) => o.isRecommended)
  const lowestCost = Math.min(...options.map((o) => o.costImpact))
  const highestCost = Math.max(...options.map((o) => o.costImpact))

  return (
    <div className="space-y-4" role="region" aria-label="Options comparison">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Options Comparison</h2>
          <p className="text-sm text-muted-foreground">
            {options.length} option{options.length !== 1 ? 's' : ''} to compare
            {recommendedOption && ' — designer recommendation highlighted'}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-warning" aria-hidden="true" /> Recommended
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" /> Selected
          </span>
        </div>
      </div>

      <div
        className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 animate-stagger"
        role="list"
        aria-label="Decision options"
      >
        {options.map((option) => {
          const isSelected = selectedOptionId === option.id
          const costPercentage = highestCost > lowestCost
            ? ((option.costImpact - lowestCost) / (highestCost - lowestCost)) * 100
            : 50

          return (
            <Card
              key={option.id}
              role="listitem"
              aria-label={`Option: ${option.title}${isSelected ? ' (selected)' : ''}${option.isRecommended ? ' (recommended)' : ''}`}
              tabIndex={isReadOnly ? undefined : 0}
              className={cn(
                'relative transition-all duration-300 group',
                !isReadOnly && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isSelected
                  ? 'border-primary ring-2 ring-primary/20 shadow-card-hover'
                  : 'hover:border-primary/30 hover:shadow-card-hover',
                option.isRecommended && !isSelected && 'ring-1 ring-warning/40'
              )}
              onClick={() => !isReadOnly && onSelectOption(option.id)}
              onKeyDown={(e) => {
                if (!isReadOnly && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault()
                  onSelectOption(option.id)
                }
              }}
            >
              {option.isRecommended && (
                <div className="absolute -top-3 left-4 z-10">
                  <Badge className="bg-gradient-to-r from-warning/20 to-warning/10 text-foreground border border-warning/30 gap-1 shadow-sm">
                    <Star className="h-3 w-3 fill-warning text-warning" aria-hidden="true" /> Recommended
                  </Badge>
                </div>
              )}

              {isSelected && (
                <div
                  className="absolute -top-3 right-4 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm animate-scale-in"
                  aria-hidden="true"
                >
                  <Check className="h-3.5 w-3.5" />
                </div>
              )}

              <CardContent className="p-5 pt-7 space-y-4">
                <div className="relative h-36 rounded-lg bg-gradient-to-br from-muted to-muted/60 border border-border flex items-center justify-center overflow-hidden group/img">
                  {option.image ? (
                    <img
                      src={option.image}
                      alt={`Preview of ${option.title}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Image className="h-8 w-8" aria-hidden="true" />
                      <span className="text-xs">Material Preview</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-foreground/0 group-hover/img:bg-foreground/5 transition-colors flex items-center justify-center">
                    <ZoomIn className="h-5 w-5 text-primary-foreground opacity-0 group-hover/img:opacity-60 transition-opacity" aria-hidden="true" />
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-semibold leading-tight">{option.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {option.description}
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <span className="text-sm font-semibold">{formatCurrency(option.costImpact)}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                      Cost Impact
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full bg-muted overflow-hidden"
                    role="meter"
                    aria-label={`Cost impact: ${formatCurrency(option.costImpact)}`}
                    aria-valuenow={costPercentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-500',
                        costPercentage < 33
                          ? 'bg-success'
                          : costPercentage < 66
                            ? 'bg-warning'
                            : 'bg-destructive'
                      )}
                      style={{ width: `${Math.max(costPercentage, 10)}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-success">
                      <ThumbsUp className="h-3 w-3" aria-hidden="true" /> Pros
                    </p>
                    <ul className="space-y-1" aria-label={`Pros of ${option.title}`}>
                      {option.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Check className="h-3 w-3 mt-0.5 text-success shrink-0" aria-hidden="true" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-destructive">
                      <ThumbsDown className="h-3 w-3" aria-hidden="true" /> Cons
                    </p>
                    <ul className="space-y-1" aria-label={`Cons of ${option.title}`}>
                      {option.cons.map((con) => (
                        <li key={con} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <X className="h-3 w-3 mt-0.5 text-destructive/70 shrink-0" aria-hidden="true" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <Tooltip content="View attached specs">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1.5 text-xs text-muted-foreground"
                      aria-label={`View specifications for ${option.title}`}
                    >
                      <FileText className="h-3.5 w-3.5" aria-hidden="true" /> Specs
                    </Button>
                  </Tooltip>
                  {!isReadOnly && (
                    <Button
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      className="h-8 ml-auto text-xs gap-1.5"
                      aria-label={isSelected ? `${option.title} is selected` : `Select ${option.title}`}
                      aria-pressed={isSelected}
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectOption(option.id)
                      }}
                    >
                      {isSelected ? (
                        <><Check className="h-3.5 w-3.5" aria-hidden="true" /> Selected</>
                      ) : (
                        'Select'
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}

        {!isReadOnly && onAddOption && (
          <Card
            role="listitem"
            className="flex items-center justify-center border-dashed border-2 border-border bg-muted/20 cursor-pointer transition-all duration-200 hover:border-primary/40 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[300px]"
            tabIndex={0}
            onClick={onAddOption}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onAddOption()
              }
            }}
            aria-label="Add a new option"
          >
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <div className="rounded-full bg-muted p-3">
                <Plus className="h-6 w-6" aria-hidden="true" />
              </div>
              <span className="text-sm font-medium">Add Option</span>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
