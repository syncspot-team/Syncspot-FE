export interface IPlaceCandidate {
  name: string;
  siDo: string;
  siGunGu: string;
  roadNameAddress: string;
  addressLat: number;
  addressLong: number;
}

export interface IPlaceVoteRoomCheckResponseCandidate extends IPlaceCandidate {
  id: number;
}

export interface IPlaceVoteRoomCheckResponseType {
  status: number;
  data: {
    existence: boolean;
    placeCandidates: IPlaceVoteRoomCheckResponseCandidate[];
  };
}
