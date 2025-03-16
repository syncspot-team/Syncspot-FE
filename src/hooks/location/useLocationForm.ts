import { IPlaceSaveRequestType } from '@src/types/location/placeSaveRequestType';
import { useForm, useFieldArray } from 'react-hook-form';

export interface ILocationForm {
  myLocations: IPlaceSaveRequestType[];
  friendLocations: IPlaceSaveRequestType[];
}

const isValidLocation = (loc: { addressLat: number; addressLong: number }) =>
  loc.addressLat !== 0 && loc.addressLong !== 0;

export function useLocationForm() {
  const {
    control,
    setValue,
    watch,
    reset: resetLocation,
  } = useForm<ILocationForm>({
    defaultValues: {
      myLocations: [],
      friendLocations: [],
    },
  });

  const {
    fields: myLocationFields,
    append: appendMyLocation,
    remove: removeMyLocation,
  } = useFieldArray({
    control,
    name: 'myLocations',
  });

  const { fields: friendLocationFields } = useFieldArray({
    control,
    name: 'friendLocations',
  });

  const myLocations = watch('myLocations');
  const friendLocations = watch('friendLocations');

  const isAllMyLocationsFilled =
    myLocations.length > 0 && myLocations.every(isValidLocation);

  const handleAddLocation = () => {
    appendMyLocation({
      siDo: '',
      siGunGu: '',
      roadNameAddress: '',
      addressLat: 0,
      addressLong: 0,
    });
  };

  const formatLocations = (
    locations: typeof myLocations | undefined,
    isMyLocation: boolean,
  ) =>
    locations?.filter(isValidLocation).map((location) => ({
      lat: location.addressLat,
      lng: location.addressLong,
      isMyLocation,
      roadNameAddress: location.roadNameAddress,
    })) || [];

  const coordinates = [
    ...formatLocations(myLocations, true),
    ...formatLocations(friendLocations, false),
  ];

  return {
    control,
    setValue,
    resetLocation,
    myLocationFields,
    friendLocationFields,
    removeMyLocation,
    appendMyLocation,
    handleAddLocation,
    myLocations,
    friendLocations,
    isAllMyLocationsFilled,
    coordinates,
    shouldShowMap: coordinates.length > 0,
  };
}
