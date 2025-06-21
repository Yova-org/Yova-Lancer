export default function LandingLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Skeleton */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse" />
              <div className="hidden md:block mr-4">
                <div className="w-16 h-6 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex space-x-8 space-x-reverse">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex space-x-4 space-x-reverse">
                <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
                <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section Skeleton */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-48 h-6 bg-gray-200 rounded mx-auto mb-6 animate-pulse" />
            <div className="w-96 h-12 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
            <div className="w-80 h-12 bg-gray-200 rounded mx-auto mb-6 animate-pulse" />
            <div className="w-full max-w-3xl h-20 bg-gray-200 rounded mx-auto mb-8 animate-pulse" />
            <div className="flex justify-center gap-4 mb-12">
              <div className="w-40 h-12 bg-gray-200 rounded animate-pulse" />
              <div className="w-40 h-12 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-8 bg-gray-200 rounded mx-auto mb-2 animate-pulse" />
                <div className="w-24 h-4 bg-gray-200 rounded mx-auto animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-32 h-6 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
            <div className="w-80 h-8 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
            <div className="w-96 h-4 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow-sm border">
                <div className="w-16 h-16 bg-gray-200 rounded-2xl mb-6 animate-pulse" />
                <div className="w-32 h-6 bg-gray-200 rounded mb-4 animate-pulse" />
                <div className="w-full h-16 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
