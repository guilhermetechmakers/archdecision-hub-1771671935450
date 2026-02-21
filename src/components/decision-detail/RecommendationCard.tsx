import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn, formatCurrency } from '@/lib/utils'
import type { DecisionOption } from '@/types'
import { Lightbulb, Star, DollarSign, ArrowRight, PlusCircle } from 'lucide-react'

interface RecommendationCardProps {
  recommendedOption: DecisionOption | undefined
  designerName: string
  allOptions: DecisionOption[]
  onAddRecommendation?: () => void
  className?: string
}

export function RecommendationCard({
  recommendedOption,
  designerName,
  allOptions,
  onAddRecommendation,
  className,
}: RecommendationCardProps) {
  if (!recommendedOption) {
    return (
      <Card className={cn('rounded-lg shadow-card border-dashed border-2 border-border', className)} role="region" aria-label="Designer recommendation">
        <CardContent className="flex flex-col items-center justify-center p-6 py-12 text-center">
          <div className="mb-4 rounded-full bg-warning/10 p-3">
            <Lightbulb className="h-6 w-6 text-warning" aria-hidden="true" />
          </div>
          <h3 className="font-semibold text-foreground">No Recommendation Yet</h3>
          <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
            The design team has not yet provided a recommendation for this decision.
          </p>
          {onAddRecommendation && (
            <Button
              size="sm"
              className="mt-5 gap-2"
              onClick={onAddRecommendation}
              aria-label="Add a designer recommendation"
            >
              <PlusCircle className="h-4 w-4" aria-hidden="true" />
              Add Recommendation
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  const otherOptions = allOptions.filter((o) => o.id !== recommendedOption.id)
  const avgOtherCost =
    otherOptions.length > 0
      ? otherOptions.reduce((sum, o) => sum + o.costImpact, 0) / otherOptions.length
      : 0
  const costDiff = recommendedOption.costImpact - avgOtherCost
  const costLabel = costDiff > 0 ? 'more' : 'less'

  return (
    <Card
      className={cn(
        'rounded-lg shadow-card overflow-hidden border-warning/30 bg-gradient-to-br from-warning/5 to-card',
        className,
      )}
      role="region"
      aria-label="Designer recommendation"
    >
      <CardContent className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-warning/15 p-2.5">
              <Lightbulb className="h-5 w-5 text-warning" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Designer Recommendation</h3>
              <p className="text-xs text-muted-foreground">by {designerName}</p>
            </div>
          </div>
          <Badge variant="warning" className="gap-1">
            <Star className="h-3 w-3 fill-warning" /> Top Pick
          </Badge>
        </div>

        <div className="rounded-lg border border-warning/20 bg-card p-4 space-y-3">
          <div className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-warning" />
            <h4 className="font-semibold text-foreground">{recommendedOption.title}</h4>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {recommendedOption.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold text-foreground">
                {formatCurrency(recommendedOption.costImpact)}
              </span>
            </div>
            {otherOptions.length > 0 && (
              <span className="text-xs text-muted-foreground">
                {formatCurrency(Math.abs(costDiff))} {costLabel} than avg. alternative
              </span>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-warning/15 bg-warning/5 p-3">
          <p className="text-sm italic leading-relaxed text-foreground/80">
            &ldquo;This option provides the best balance of aesthetic impact, durability, and long-term value.
            The natural patina development creates a unique, evolving facade that aligns with the project&rsquo;s
            connection to the river environment.&rdquo;
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
