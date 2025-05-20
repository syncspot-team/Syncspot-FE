export const PwInquiryStepType = {
  PW_INQUIRY_STEP: 'PW_INQUIRY_STEP',
  PW_REISSUE_STEP: 'PW_REISSUE_STEP',
} as const;

export type PwInquiryStepType =
  (typeof PwInquiryStepType)[keyof typeof PwInquiryStepType];
