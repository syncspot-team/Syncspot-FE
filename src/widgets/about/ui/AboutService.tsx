import IconDolphin from '@assets/icons/IconDolphin.svg?react';
import IconAboutSpot from '@assets/icons/IconAboutSpot.png';

export default function AboutService() {
  return (
    <section
      className="relative flex flex-col justify-start px-4 lg:pl-16 lg:justify-center h-full pb-10
    lg:pb-0 lg:min-h-[43.75rem] bg-blue-light01 rounded-3xl"
    >
      <h1 className="z-50 mt-6 mb-5 lg:mt-24 text-subtitle lg:text-logo text-tertiary">
        모두가 편하게
        <br />
        만날 수 있는 지름길, 싱크스팟!
      </h1>
      <div className="z-50 flex flex-col gap-2 font-semibold text-content lg:text-menu text-gray-dark">
        <p className="lg:flex lg:flex-col lg:gap-1">
          <span>친구와의 약속을 편하게 만들기 위해 시작된 서비스가</span>
          <span> 더 많은 사람들을 위한 모두의 서비스가 됩니다.</span>
        </p>
        <p className="lg:flex lg:flex-col lg:gap-1">
          <span>모임의 장소와 시간을 정하는</span>
          <span>당신의 마음이 편안해지고 있습니다.</span>
        </p>
      </div>
      <img
        src={IconAboutSpot}
        alt="AboutSpot"
        className="size-[100px] lg:size-[20.625rem] 
       absolute lg:top-0 lg:left-[32%] 2xl:left-[30%] 
       right-44 bottom-[25%] lg:bottom-auto
       lg:ml-[6.25rem]"
      />
      <IconDolphin
        className="size-[9.375rem] lg:size-[28.125rem] 2xl:size-[34.275rem] 
       right-[3%] 2xl:right-[5%] 
       relative lg:absolute 
       -bottom-[10%]
       ml-auto mt-10 lg:mt-0
       lg:animate-customBounce"
      />
    </section>
  );
}
