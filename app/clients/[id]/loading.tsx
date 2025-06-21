import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function ClientProfileLoading() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Client Info Card Skeleton */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <Skeleton className="w-20 h-20 rounded-full" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <Skeleton className="h-8 w-64 mb-2" />
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="w-4 h-4 rounded" />
                      ))}
                    </div>
                    <div className="flex gap-2 mb-4">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-12 rounded-full" />
                    </div>
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-8 w-32 mb-1" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-xl" />
                  <div>
                    <Skeleton className="h-6 w-20 mb-1" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs and Content Skeleton */}
        <div className="space-y-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-10 flex-1" />
            ))}
          </div>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-4 border border-gray-200 rounded-lg">
                    <Skeleton className="h-5 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-3" />
                    <div className="grid grid-cols-2 gap-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
