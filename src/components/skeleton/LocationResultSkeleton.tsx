const LocationResultSkeleton = () => {
  // 5개의 중간지점 항목을 표시하는 스켈레톤 생성
  const midpointItems = Array(5)
    .fill(0)
    .map((_, index) => (
      <li
        key={index}
        className="flex flex-col justify-center h-full p-4 bg-gray-100 shadow-sm rounded-default animate-pulse"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gray-200 rounded-full size-6"></div>
            <div className="w-32 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="flex items-center my-2">
          <div className="w-40 h-5 mt-1 bg-gray-200 rounded"></div>
        </div>
        <div className="w-48 h-4 mt-1 bg-gray-200 rounded"></div>
      </li>
    ));

  return (
    <>
      <div className="hidden lg:grid w-full grid-cols-1 lg:grid-cols-10 px-4 lg:px-[7.5rem] gap-[1.25rem] lg:gap-[0.625rem] mt-[1.5625rem]">
        <div className="rounded-default h-[31.25rem] lg:min-h-[calc(100vh-8rem)] lg:col-span-6 bg-gray-100 animate-pulse"></div>
        <div className="lg:col-span-4 lg:max-h-[calc(100vh-8rem)]">
          <ul className="grid grid-cols-1 grid-rows-5 h-full gap-[0.625rem]">
            {midpointItems}
          </ul>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="fixed inset-0 top-[4.75rem] bg-gray-100 animate-pulse"></div>
        <div className="fixed bottom-0 left-0 right-0">
          <div className="relative w-full pb-6">
            <div className="flex gap-2 p-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              <div className="snap-center shrink-0 first:pl-0 last:pr-4 w-[calc(100dvw-5rem)]">
                <div className="bg-white-default">
                  <div className="flex flex-col justify-center h-32 p-4 bg-gray-100 shadow-sm rounded-default animate-pulse">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-200 rounded-full size-6"></div>
                        <div className="w-32 h-4 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="flex items-center my-2">
                      <div className="w-40 h-5 mt-1 bg-gray-200 rounded"></div>
                    </div>
                    <div className="w-48 h-4 mt-1 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationResultSkeleton;
