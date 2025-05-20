import { API } from '@src/shared/constants';
import { IPwReissueEmailVerificationRequestType } from '@src/shared/types/auth/PwReissueEmailVerificationRequestType';
import { getAPIResponseData } from '@src/shared/utils';

export const postPwReissueEmailVerification = async (
  pwReissueEmailVerificationRequestPayload: IPwReissueEmailVerificationRequestType,
) => {
  return getAPIResponseData<void, IPwReissueEmailVerificationRequestType>({
    url: API.PASSWORD_REISSUE_EMAIL_VERIFICATION,
    method: 'POST',
    data: pwReissueEmailVerificationRequestPayload,
  });
};
