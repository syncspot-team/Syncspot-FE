import {
  IMemberAvailability,
  ITimeResult,
} from '@src/types/time/timeResultType';
import { ITimeVoted } from './timeVotedResponseType';

export interface ITimeDatesProps {
  dates: Date[];
}

export interface ITimeVotedMyProps extends ITimeDatesProps, ITimeVoted {}

export interface ITimeDatePickerProps {
  date: Date;
  myVote: {
    memberAvailableStartTime: string;
    memberAvailableEndTime: string;
  };
  isChecked: boolean;
  onCheckboxChange: () => void;
  onChange: (
    startHour: string,
    startMinute: string,
    endHour: string,
    endMinute: string,
  ) => void;
}

export interface ITimeResultProps extends ITimeDatesProps, ITimeResult {}

export interface ITimeSelectBoxProps {
  initialHour: string;
  initialMinute: string;
  onChange: (start: string, end: string) => void;
}

export interface ITimeGridProps {
  hours: string[];
  gridColors: string[];
}

export interface IVoteResultByDate {
  clickedDate: Date;
  result: {
    [date: string]: IMemberAvailability[];
  };
}

export interface IVotes {
  memberAvailableStartTime: string;
  memberAvailableEndTime: string;
}
[];
