export default function LoadingAppPage() {
  return (
    <div className="min-h-screen bg-gray-50/30 p-8 animate-pulse">
      <div className="max-w-6xl mx-auto">
        <div className="h-4 bg-gray-200 rounded w-48 mb-8"></div>
        <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-10"></div>
        
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="h-32 bg-gray-200 rounded-xl"></div>
          <div className="h-32 bg-gray-200 rounded-xl"></div>
          <div className="h-32 bg-gray-200 rounded-xl"></div>
        </div>

        <div className="h-64 bg-gray-200 rounded-xl mb-8"></div>
      </div>
    </div>
  );
}
