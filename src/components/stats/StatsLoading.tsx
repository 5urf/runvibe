const StatsLoading = () => {
  return (
    <div>
      <div className='max-w-4xl mx-auto px-6 py-8'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2'>
            📊 러닝 취향 통계
          </h1>
          <p className='text-gray-600'>지금까지의 분석 결과를 확인해보세요!</p>
        </div>
        {/* 참여자 카드 스켈레톤 */}
        <div className='card p-8 text-center mb-8'>
          <div className='w-32 h-6 bg-gray-200 rounded-lg mx-auto mb-2 animate-pulse' />
          <div className='w-24 h-12 bg-gray-200 rounded-lg mx-auto mb-2 animate-pulse' />
          <div className='w-40 h-5 bg-gray-200 rounded-lg mx-auto animate-pulse' />
        </div>
        {/* 포디움 스켈레톤 */}
        <div className='card p-8 mb-8'>
          <div className='w-48 h-6 bg-gray-200 rounded-lg mx-auto mb-6 animate-pulse' />
          <div className='flex justify-center items-end space-x-3 md:space-x-6'>
            {[
              { height: "h-24 md:h-28", label: "2위" },
              { height: "h-32 md:h-36", label: "1위" },
              { height: "h-20 md:h-24", label: "3위" },
            ].map((item, index) => (
              <div
                key={index}
                className='text-center flex-1 max-w-[100px] md:max-w-none'
              >
                <div
                  className={`${item.height} bg-gray-200 rounded-xl mb-2 md:mb-3 animate-pulse`}
                />
                <div className='w-16 h-4 bg-gray-200 rounded mx-auto mb-1 animate-pulse' />
                <div className='w-12 h-5 bg-gray-200 rounded mx-auto mb-1 animate-pulse' />
                <div className='w-10 h-3 bg-gray-200 rounded mx-auto animate-pulse' />
              </div>
            ))}
          </div>
        </div>
        {/* 도넛차트 스켈레톤 */}
        <div className='card p-8 mb-8'>
          <div className='w-40 h-6 bg-gray-200 rounded-lg mx-auto mb-6 animate-pulse' />
          {/* 도넛 형태 스켈레톤 */}
          <div className='relative h-80 w-full mb-4'>
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='w-60 h-60 rounded-full border-8 border-gray-200 animate-pulse'>
                <div className='w-full h-full flex items-center justify-center'>
                  <div className='w-32 h-32 bg-white rounded-full' />
                </div>
              </div>
              <div className='absolute w-60 h-60 border-8 border-transparent border-t-gray-300 rounded-full animate-spin' />
            </div>
            <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
              <div className='text-center'>
                <div className='w-12 h-8 bg-gray-200 rounded mx-auto mb-1 animate-pulse' />
                <div className='w-16 h-4 bg-gray-200 rounded mx-auto animate-pulse' />
              </div>
            </div>
          </div>
          {/* 범례 스켈레톤 */}
          <div className='flex flex-wrap justify-center gap-x-6 gap-y-3 mt-6'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className='flex items-center space-x-2'>
                <div className='w-4 h-4 bg-gray-200 rounded-full animate-pulse' />
                <div className='w-20 h-4 bg-gray-200 rounded animate-pulse' />
                <div className='w-8 h-4 bg-gray-200 rounded animate-pulse' />
              </div>
            ))}
          </div>
        </div>
        {/* 하단 버튼 스켈레톤 */}
        <div className='text-center'>
          <div className='w-48 h-12 bg-gray-200 rounded-lg mx-auto animate-pulse' />
        </div>
      </div>
    </div>
  );
};

export default StatsLoading;
