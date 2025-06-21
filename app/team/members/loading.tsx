import { DashboardLayout } from "@/components/dashboard-layout"

export default function TeamMembersLoading() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse" />
          </div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
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
          <div className="flex gap-4">
            <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse" />
            <div className="w-40 h-10 bg-gray-200 rounded animate-pulse" />
            <div className="w-40 h-10 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
                <div className="space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="h-8 bg-gray-200 rounded flex-1 animate-pulse" />
                <div className="h-8 bg-gray-200 rounded flex-1 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
