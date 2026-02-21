import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'
import type { DecisionOption } from '@/types'
import { Lightbulb, Star, DollarSign, ArrowRight } from 'lucide-react'

interface RecommendationCardProps {
  recommendedOption: DecisionOption | undefined
  designerName: string
  allOptions: DecisionOption[]
}

export function RecommendationCard({ recommendedOption, designerName, allOptions }: RecommendationCardProps) {
  if (!recommendedOption) {
    return (
      <Card className="border-dashed border-2 border-muted">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center py-10">
          <div className="rounded-full bg-muted p-3 mb-3">
            <Lightbulb className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-muted-foreground">No Recommendation Yet</h3>
          <p className="text-sm text-muted-foreground mt-1">
            The design team has not yet provided a recommendation for this decision.
          </p>
        </CardContent>
      </Card>
    )
  }

  const otherOptions = allOptions.filter((o) => o.id !== recommendedOption.id)
  const avgOtherCost = otherOptions.length > 0
    ? otherOptions.reduce((sum, o) => sum + o.costImpact, 0) / otherOptions.length
    : 0
  const costDiff = recommendedOption.costImpact - avgOtherCost
  const costLabel = costDiff > 0 ? 'more' : 'less'

  return (
    <Card className="border-amber-200/60 bg-gradient-to-br from-amber-50/50 to-white overflow-hidden">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-amber-100 p-2.5">
              <Lightbulb className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Designer Recommendation</h3>
              <p className="text-xs text-muted-foreground">by {designerName}</p>
            </div>
          </div>
          <Badge className="bg-amber-100 text-amber-700 border-amber-200 gap-1">
            <Star className="h-3 w-3 fill-amber-400" /> Top Pick
          </Badge>
        </div>

        <div className="rounded-lg border border-amber-200/50 bg-white p-4 space-y-3">
          <div className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-amber-600" />
            <h4 className="font-semibold">{recommendedOption.title}</h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {recommendedOption.description}
          </p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">{formatCurrency(recommendedOption.costImpact)}</span>
            </div>
            {otherOptions.length > 0 && (
              <span className="text-xs text-muted-foreground">
                {formatCurrency(Math.abs(costDiff))} {costLabel} than avg. alternative
              </span>
            )}
          </div>
        </div>

        <div className="rounded-lg bg-amber-50/80 p-3 border border-amber-100">
          <p className="text-sm text-amber-800 leading-relaxed italic">
            "This option provides the best balance of aesthetic impact, durability, and long-term value.
            The natural patina development creates a unique, evolving facade that aligns with the project's
            connection to the river environment."
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
