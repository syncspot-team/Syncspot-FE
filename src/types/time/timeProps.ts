import { IMemberAvailability } from '@src/types/time/timeResultType';

export interface ITimeDatesProps {
  dates: Date[];
}

export interface IMyVoteProps extends ITimeDatesProps {
  bottomSheetHeight: number;
}

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
  isMobile: boolean;
}

export interface IVotes {
  memberAvailableStartTime: string;
  memberAvailableEndTime: string;
}
[];
