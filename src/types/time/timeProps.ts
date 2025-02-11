import { ITimeResultResponseType } from '@src/types/time/timeResultType';
import { ITimeVotedResponseType } from './timeVotedResponseType';

export interface ITimeDatesProps {
  dates: Date[];
}

export interface ITimeVotedMyProps
  extends ITimeDatesProps,
    ITimeVotedResponseType {}

export interface ITimeDatePickerProps {
  date: Date;
  myVote: {
    memberAvailableStartTime: string;
    memberAvailableEndTime: string;
  };
  onChange: (start: string, end: string) => void;
}

export interface ITimeResultProps
  extends ITimeDatesProps,
    ITimeResultResponseType {}

export interface ITimeSelectBoxProps {
  initialHour: string;
  initialMinute: string;
  onChange: (start: string, end: string) => void;
}

export interface ITimeGridProps {
  hours: string[];
  gridColors: string[];
}
