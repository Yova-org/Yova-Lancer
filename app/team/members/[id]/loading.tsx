import { DashboardLayout } from "@/components/dashboard-layout"

export default function MemberProfileLoading() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          <div>
            <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="w-64 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Profile Header Skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <div className="w-32 h-32 bg-gray-200 rounded-full animate-pulse mb-4"></div>
              <div className="w-24 h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                <div>
                  <div className="w-16 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="w-full h-12 bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-full h-24 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
