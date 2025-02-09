export const LOCATION_KEY = {
  GET_PLACE_SEARCH: (roomId: string) => ['getPlaceSearch', roomId],
  GET_MIDPOINT_SEARCH: (roomId: string) => ['getMidpointSearch', roomId],
  GET_MIDPOINT_TIME_SEARCH: (roomId: string) => [
    'getMidpointTimeSearch',
    roomId,
  ],
  GET_RECOMMEND_PLACE_SEARCH: (roomId: string) => [
    'getRecommendPlaceSearch',
    roomId,
  ],
};
