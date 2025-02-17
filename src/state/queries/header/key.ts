export const ROOM_QUERY_KEY = {
  GET_JOINED_ROOM: () => ['joinedRoom'],
  GET_CHECK_LOCATION_ENTER: (roomId: string) => ['checkLocationEnter', roomId],
  GET_PLACE_VOTE_ROOM_EXISTS: (roomId: string) => [
    'placeVoteRoomExists',
    roomId,
  ],
  GET_TIME_VOTE_ROOM_EXISTS: (roomId: string) => ['timeVoteRoomExists', roomId],
  GET_PLACE_VOTED: (roomId: string) => ['placeVoted', roomId],
  GET_TIME_VOTED: (roomId: string) => ['timeVoted', roomId],
};
