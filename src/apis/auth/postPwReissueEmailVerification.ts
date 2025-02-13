import { API } from '@src/constants/api';
import { IPwReissueEmailVerificationRequestType } from '@src/types/auth/PwReissueEmailVerificationRequestType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const postPwReissueEmailVerification = async (
  pwReissueEmailVerificationRequestPayload: IPwReissueEmailVerificationRequestType,
) => {
  return getAPIResponseData<void, IPwReissueEmailVerificationRequestType>({
    url: API.PASSWORD_REISSUE_EMAIL_VERIFICATION,
    method: 'POST',
    data: pwReissueEmailVerificationRequestPayload,
  });
};
