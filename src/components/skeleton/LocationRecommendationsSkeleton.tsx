const LocationRecommendationsSkeleton = () => {
  // 추천 장소 항목 스켈레톤 생성
  const recommendItems = Array(5)
    .fill(0)
    .map((_, index) => (
      <div
        key={index}
        className="p-4 mb-3 bg-gray-100 rounded-lg animate-pulse ring-1 ring-primary"
      >
        <div className="flex items-start justify-between mb-[0.125rem]">
          <div className="flex items-center gap-2">
            <div className="bg-gray-200 rounded-full size-5"></div>
            <div className="w-20 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-40 h-5 bg-gray-200 rounded"></div>
          <div className="bg-gray-200 rounded-full size-3"></div>
        </div>
        <div className="w-48 h-4 mt-2 bg-gray-200 rounded"></div>
      </div>
    ));

  return (
    <>
      <div className="hidden lg:block">
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 px-4 lg:px-[7.5rem] gap-[0.9375rem] mt-4 pb-2">
          <div className="w-48 h-8 ml-2 bg-gray-100 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
        </div>
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 px-4 lg:px-[7.5rem] gap-[0.9375rem] mt-[0.4375rem]">
          <div className="rounded-default h-[31.25rem] lg:h-[calc(100vh-10rem)] bg-gray-100 animate-pulse"></div>
          <div className="space-y-3 animate-pulse">
            {recommendItems}
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-[2.5rem] h-8 bg-gray-200 rounded"></div>
              <div className="w-12 h-4 bg-gray-200 rounded"></div>
              <div className="w-[2.5rem] h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="fixed inset-0 top-[4.75rem] bg-gray-100 animate-pulse"></div>
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md rounded-t-2xl">
          <div className="flex flex-col h-full">
            <div className="sticky top-0 px-4 py-3">
              <div className="w-40 h-5 mb-3 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="px-4">
              <div className="mt-4 space-y-3 animate-pulse">
                {recommendItems[0]}
              </div>
              <div className="flex items-center justify-center gap-3 py-4 animate-pulse">
                <div className="w-[2.5rem] h-8 bg-gray-200 rounded"></div>
                <div className="w-12 h-4 bg-gray-200 rounded"></div>
                <div className="w-[2.5rem] h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationRecommendationsSkeleton;
