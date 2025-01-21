import { useForm } from 'react-hook-form';
import Button from '@src/components/common/button/Button';

interface ILocationForm {
  locations: {
    siDo: string;
    siGunGu: string;
    roadNameAddress: string;
    addressLat: number;
    addressLong: number;
    voteCount: number;
  }[];
}

const DUMMY_LOCATIONS = {
  locations: [
    {
      siDo: '서울특별시',
      siGunGu: '홍대입구역 2번 출구',
      roadNameAddress: '테헤란로 427',
      addressLat: 37.5065,
      addressLong: 127.0536,
      voteCount: 4,
    },
    {
      siDo: '서울특별시',
      siGunGu: '서울역 2번 출구',
      roadNameAddress: '강남대로 373',
      addressLat: 37.4969,
      addressLong: 127.0278,
      voteCount: 3,
    },
    {
      siDo: '서울특별시',
      siGunGu: '용산역 2번 출구',
      roadNameAddress: '월드컵북로 396',
      addressLat: 37.5575,
      addressLong: 126.9076,
      voteCount: 2,
    },
    {
      siDo: '서울특별시',
      siGunGu: '용산역 2번 출구',
      roadNameAddress: '월드컵북로 396',
      addressLat: 37.5575,
      addressLong: 126.9076,
      voteCount: 1,
    },
  ],
};

export default function PlaceResultPage() {
  const { watch } = useForm<ILocationForm>({
    defaultValues: DUMMY_LOCATIONS,
  });

  const locations = watch('locations');

  const handleVoteAgain = () => {
    // TODO: 투표 제출 요청
  };

  const handleCreateVoteAgain = () => {
    // TODO: 투표 재생성 요청
  };

  return (
    <div className="flex flex-col items-center w-full pt-16 pb-10 bg-gray-light mt-[2.5rem]">
      <div className="flex flex-col items-center w-full">
        <h1 className="-mt-8 text-title text-blue-dark02">투표 결과</h1>
        <p className="mt-2 mb-4 text-content text-gray-dark">
          이번 모임 만남이 가능한 장소를 확인해보세요!
        </p>

        <ul className="mb-8 flex flex-col gap-4 max-h-[25rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full">
          {locations.map((location, index) => (
            <li
              key={index}
              className="flex items-center gap-4 *:py-6 *:px-8 *:rounded-lg *:shadow-sm"
            >
              <span className="text-menu-selected text-primary bg-white-default">
                {location.voteCount}표
              </span>
              <span className="text-left text-menu bg-white-default w-[20rem]">
                {location.siGunGu}
              </span>
            </li>
          ))}
        </ul>

        <Button
          buttonType="primary"
          fontSize="small"
          className="mb-[0.625rem] h-[3.125rem]"
          onClick={handleVoteAgain}
        >
          투표 다시하기
        </Button>
        <Button
          buttonType="primary"
          fontSize="small"
          className="h-[3.125rem]"
          onClick={handleCreateVoteAgain}
        >
          투표 재생성하기
        </Button>
      </div>
    </div>
  );
}
