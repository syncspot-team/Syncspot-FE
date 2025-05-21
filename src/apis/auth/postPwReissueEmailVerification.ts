import { API } from '@shared/constants';
import { IPwReissueEmailVerificationRequestType } from '@shared/types/auth/PwReissueEmailVerificationRequestType';
import { getAPIResponseData } from '@shared/utils';

export const postPwReissueEmailVerification = async (
  pwReissueEmailVerificationRequestPayload: IPwReissueEmailVerificationRequestType,
) => {
  return getAPIResponseData<void, IPwReissueEmailVerificationRequestType>({
    url: API.PASSWORD_REISSUE_EMAIL_VERIFICATION,
    method: 'POST',
    data: pwReissueEmailVerificationRequestPayload,
  });
};
