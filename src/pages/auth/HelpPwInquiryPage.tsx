import { useState } from 'react';
import { PwInquiryStepType } from '@src/types/auth/PwInquiryStepType';
import PwReissueStep from '@src/components/auth/PwReissueStep';
import PwInquiryStep from '@src/components/auth/PwInquiryStep';

export default function HelpPwInquiryPage() {
  const [pwInquiryStep, setPwInquiryStep] = useState<
    keyof typeof PwInquiryStepType
  >(PwInquiryStepType.PW_INQUIRY_STEP);

  return (
    <div className="flex flex-col items-center justify-center mx-auto my-0 mt-[8.75rem] px-4 lg:px-[7.5rem]">
      <h1 className="mb-8 text-subtitle lg:text-title text-tertiary">
        {pwInquiryStep === PwInquiryStepType.PW_INQUIRY_STEP
          ? '비밀번호 찾기'
          : '비밀번호 재발급 안내'}
      </h1>

      {pwInquiryStep === PwInquiryStepType.PW_INQUIRY_STEP && (
        <PwInquiryStep setPwInquiryStep={setPwInquiryStep} />
      )}

      {pwInquiryStep === PwInquiryStepType.PW_REISSUE_STEP && <PwReissueStep />}
    </div>
  );
}
