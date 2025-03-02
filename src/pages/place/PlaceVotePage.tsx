import { useForm } from 'react-hook-form';
import KakaoMap from '@src/components/common/kakao/KakaoMap';
import { useState, useEffect } from 'react';
import Button from '@src/components/common/button/Button';
import { useGetPlaceVoteRoomCheckQuery } from '@src/state/queries/place/useGetPlaceVoteRoomCheckQuery';
import { useGetPlaceVoteLookupQuery } from '@src/state/queries/place/useGetPlaceVoteLookupQuery';
import { usePlaceVoteMutation } from '@src/state/mutations/place/usePlaceVoteMutation';
import { usePlaceRevoteMutation } from '@src/state/mutations/place/usePlaceRevoteMutation';
import { IPlaceVoteRoomCheckResponseCandidate } from '@src/types/place/placeVoteRoomCheckResponseType';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from '@src/constants/path';
import ShareButton from '@src/components/layout/header/ShareButton';
import PlaceVoteErrorPage from '@src/components/place/PlaceVoteErrorPage';
import { Loading } from '@src/components/loading/Loading';
import BottomSheet from '@src/components/common/bottomSheet/BottomSheet';

interface ILocationForm {
  locations: IPlaceVoteRoomCheckResponseCandidate[];
}

export default function PlaceVotePage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(
    null,
  );
  const [bottomSheetHeight, setBottomSheetHeight] = useState(500);

  const { data: placeVoteRoomCheckData, isLoading: isRoomCheckLoading } =
    useGetPlaceVoteRoomCheckQuery();
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

  const locations = watch('locations');

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

  const isValidLocation = (loc: IPlaceVoteRoomCheckResponseCandidate) =>
    loc.addressLat !== 0 && loc.addressLong !== 0;

  const coordinates = locations.filter(isValidLocation).map((location) => ({
    lat: location.addressLat,
    lng: location.addressLong,
    roadNameAddress: location.roadNameAddress,
    isMyLocation: location.id === selectedLocationId,
    isSelected: location.id === selectedLocationId,
  }));

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

  if (isRoomCheckLoading || locations.length === 0) {
    return <Loading className="h-[calc(100vh-8rem)]" />;
  }

  if (!placeVoteRoomCheckData?.data.existence) {
    return <PlaceVoteErrorPage />;
  }

  return (
    <>
      <div className="hidden lg:grid w-full grid-cols-2 px-[7.5rem] gap-[0.9375rem] mt-[1.875rem]">
        <div className="flex flex-col order-2 p-5 rounded-default bg-gray-light lg:order-1 lg:max-h-[calc(100vh-8rem)]">
          <div className="flex items-center justify-between my-[1.25rem] lg:my-[1.5625rem]">
            <h1 className="w-full ml-10 text-center text-subtitle lg:text-title text-tertiary ">
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

      <div className="lg:hidden">
        <div className="fixed inset-0 top-[4.75rem]">
          <KakaoMap coordinates={coordinates} />
        </div>

        <BottomSheet
          minHeight={40}
          maxHeight={90}
          initialHeight={50}
          headerHeight={40}
          onHeightChange={(height) => setBottomSheetHeight(height)}
        >
          <div className="flex flex-col h-full">
            <h1 className="flex items-center justify-center my-5 text-nowrap text-subtitle text-tertiary">
              모임 장소 투표하기
            </h1>

            <div
              className={`flex-1 px-4 overflow-y-auto ${bottomSheetHeight <= 40 ? 'hidden' : ''}`}
            >
              <ul className="flex flex-col p-1 scrollbar-thin scrollbar-thumb-gray-normal scrollbar-track-transparent scrollbar-thumb-rounded-full">
                {locations.map((location, index) => (
                  <li
                    key={index}
                    className="flex items-center bg-white-default rounded-default mb-[0.625rem] hover:opacity-80 cursor-pointer transition-all"
                    onClick={() => setSelectedLocationId(location.id)}
                  >
                    <span
                      className={`flex-1 w-full text-description bg-white-default py-[1.3125rem] pl-[0.9375rem] truncate rounded-default ${
                        selectedLocationId === location.id
                          ? 'ring-2 ring-primary bg-blue-light01 font-bold text-tertiary'
                          : 'ring-1 ring-gray-normal'
                      }`}
                    >
                      {location.roadNameAddress}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col px-4 py-6 mt-auto bg-white-default">
              <Button
                buttonType="primary"
                disabled={selectedLocationId === null}
                className="w-full px-[0.3125rem]"
                onClick={handleVoteSubmit}
              >
                {placeVoteLookupData?.data.existence
                  ? '재투표하기'
                  : '투표하기'}
              </Button>
            </div>
          </div>
        </BottomSheet>
      </div>
    </>
  );
}
