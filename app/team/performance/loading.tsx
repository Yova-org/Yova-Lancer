import { DashboardLayout } from "@/components/dashboard-layout"

export default function TeamPerformanceLoading() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse" />
          </div>
          <div className="flex gap-2">
            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse" />
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
              <div className="flex gap-4">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
              </div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-20 animate-pulse" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="h-6 bg-gray-200 rounded w-40 animate-pulse" />
              <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
            </div>
          </div>
          <div className="p-6 space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-4 border border-gray-100 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                      <div className="flex gap-2">
                        <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                      </div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-4 animate-pulse" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
                      <div className="h-2 bg-gray-200 rounded w-full animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
