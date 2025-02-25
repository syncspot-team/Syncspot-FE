import { useForm } from 'react-hook-form';
import KakaoMap from '@src/components/common/kakao/KakaoMap';
import { useMemo, useState, useEffect } from 'react';
import Button from '@src/components/common/button/Button';
import { useGetPlaceVoteRoomCheckQuery } from '@src/state/queries/place/useGetPlaceVoteRoomCheckQuery';
import { useGetPlaceVoteLookupQuery } from '@src/state/queries/place/useGetPlaceVoteLookupQuery';
import { usePlaceVoteMutation } from '@src/state/mutations/place/usePlaceVoteMutation';
import { usePlaceRevoteMutation } from '@src/state/mutations/place/usePlaceRevoteMutation';
import SomethingWrongErrorPage from '@src/pages/error/SomethingWrongErrorPage';
import { IPlaceVoteRoomCheckResponseCandidate } from '@src/types/place/placeVoteRoomCheckResponseType';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from '@src/constants/path';
import ShareButton from '@src/components/layout/header/ShareButton';

interface ILocationForm {
  locations: IPlaceVoteRoomCheckResponseCandidate[];
}

export default function PlaceVotePage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(
    null,
  );

  const { data: placeVoteRoomCheckData } = useGetPlaceVoteRoomCheckQuery();
  const { data: placeVoteLookupData } = useGetPlaceVoteLookupQuery({
    enabled: placeVoteRoomCheckData?.data.existence,
  });

  const { mutate: placeVoteMutation } = usePlaceVoteMutation();
  const { mutate: placeRevoteMutation } = usePlaceRevoteMutation();

  const { watch, reset } = useForm<ILocationForm>({
    defaultValues: {
      locations: [],
    },
  });

  // 초기 데이터 설정
  useEffect(() => {
    if (!placeVoteRoomCheckData?.data.placeCandidates) return;

    reset({
      locations: placeVoteRoomCheckData.data.placeCandidates.map(
        (candidate: IPlaceVoteRoomCheckResponseCandidate) => ({
          id: candidate.id,
          name: candidate.name,
          siDo: candidate.siDo,
          siGunGu: candidate.siGunGu,
          roadNameAddress: candidate.roadNameAddress,
          addressLat: candidate.addressLat,
          addressLong: candidate.addressLong,
        }),
      ),
    });
  }, [placeVoteRoomCheckData, reset]);

  // 이전 투표 데이터가 있는 경우 선택 상태 설정
  useEffect(() => {
    if (
      placeVoteLookupData?.data.existence &&
      placeVoteRoomCheckData?.data.placeCandidates
    ) {
      setSelectedLocationId(placeVoteLookupData.data.voteItem);
    }
  }, [placeVoteLookupData, placeVoteRoomCheckData]);

  const locations = watch('locations');

  const isValidLocation = (loc: IPlaceVoteRoomCheckResponseCandidate) =>
    loc.addressLat !== 0 && loc.addressLong !== 0;

  const coordinates = useMemo(() => {
    return locations.filter(isValidLocation).map((location) => ({
      lat: location.addressLat,
      lng: location.addressLong,
      roadNameAddress: location.roadNameAddress,
      isMyLocation: location.id === selectedLocationId,
    }));
  }, [locations, selectedLocationId]);

  const handleVoteSubmit = () => {
    if (selectedLocationId === null) return;

    const payload = {
      choicePlace: selectedLocationId,
    };

    if (placeVoteLookupData?.data.existence) {
      placeRevoteMutation(payload, {
        onSuccess: () => {
          navigate(PATH.PLACE_RESULT(roomId!));
        },
      });
    } else {
      placeVoteMutation(payload, {
        onSuccess: () => {
          navigate(PATH.PLACE_RESULT(roomId!));
        },
      });
    }
  };

  if (!placeVoteRoomCheckData?.data.existence) {
    return <SomethingWrongErrorPage />;
  }

  return (
    <div className="grid w-full grid-cols-1 lg:grid-cols-2 px-4 lg:px-[7.5rem] gap-[0.9375rem] mt-[1.875rem]">
      <div className="flex flex-col order-2 p-5 rounded-default bg-gray-light lg:order-1 lg:max-h-[calc(100vh-8rem)]">
        <div className="flex items-center justify-between">
          <div></div>
          <h1 className="flex items-center lg:-mr-8 justify-center text-subtitle lg:text-title text-tertiary my-[1.25rem] lg:my-[1.5625rem]">
            모임 장소 투표하기
          </h1>
          <ShareButton />
        </div>
        <div className="hidden lg:flex flex-col items-center text-content text-gray-dark mb-[1.25rem]">
          <span>우리 같이 투표해요!</span>
          <span>원하는 모임 장소를 선택한 후 투표를 진행하세요!</span>
        </div>
        <ul className="flex flex-col max-h-[calc(100vh-25rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full p-1">
          {locations.map((location, index) => (
            <li
              key={index}
              className={`flex items-center bg-white-default rounded-default mb-[0.625rem] hover:opacity-80 cursor-pointer transition-all`}
              onClick={() => setSelectedLocationId(location.id)}
            >
              <span
                className={`flex-1 w-full text-description lg:text-content bg-white-default py-[1.3125rem] pl-[0.9375rem] truncate rounded-default ${
                  selectedLocationId === location.id
                    ? 'ring-2 ring-primary bg-blue-light01 font-bold text-tertiary'
                    : 'hover:ring-1 hover:ring-gray-dark hover:bg-gray-light'
                }`}
              >
                {location.roadNameAddress}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <Button
            buttonType="primary"
            disabled={selectedLocationId === null}
            className="px-[0.3125rem] w-full"
            onClick={handleVoteSubmit}
          >
            {placeVoteLookupData?.data.existence ? '재투표하기' : '투표하기'}
          </Button>
        </div>
      </div>
      <div className="rounded-default min-h-[31.25rem] lg:min-h-[calc(100vh-8rem)] order-1 lg:order-2">
        <KakaoMap coordinates={coordinates} />
      </div>
    </div>
  );
}
