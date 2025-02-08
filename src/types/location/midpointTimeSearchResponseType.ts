export interface IMidpointTimeSearchDataResponseType {
  elements: {
    status: string;
    placeId: number;
    duration: {
      text: string;
      value: number;
    };
    distance: {
      text: string;
      value: number;
    };
  }[];
}

export interface IMidpointTimeSearchResponseType {
  isSuccess: boolean;
  status: number;
  data: IMidpointTimeSearchDataResponseType;
}
