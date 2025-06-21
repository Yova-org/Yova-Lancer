import { DashboardLayout } from "@/components/dashboard-layout"

export default function TeamMessagesLoading() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex h-[calc(100vh-8rem)] gap-6">
          {/* Conversations Sidebar Loading */}
          <div className="w-80 bg-white rounded-lg shadow-sm p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
                <div className="h-8 bg-gray-200 rounded w-8 animate-pulse" />
              </div>
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
              <div className="space-y-3">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                      <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
                      <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area Loading */}
          <div className="flex-1 bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-24 animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-200 rounded w-8 animate-pulse" />
                  <div className="h-8 bg-gray-200 rounded w-8 animate-pulse" />
                  <div className="h-8 bg-gray-200 rounded w-8 animate-pulse" />
                </div>
              </div>
            </div>

            <div className="p-4 space-y-4 h-[calc(100vh-24rem)]">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`flex gap-3 ${i % 2 === 0 ? "" : "flex-row-reverse"}`}>
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                  <div className="max-w-xs space-y-2">
                    <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-16 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="h-8 bg-gray-200 rounded w-8 animate-pulse" />
                <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 bg-gray-200 rounded w-16 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
