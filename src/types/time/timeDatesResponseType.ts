export interface ITimeDatesResponseType {
  isSuccess: boolean;
  status: number;
  data: {
    existence: boolean;
    dates: string[];
  };
}
