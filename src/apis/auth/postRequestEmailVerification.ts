import getAPIResponseData from '@src/utils/getAPIResponseData';
import { API } from '@src/constants/api';
import { ISignUpRequestEmailVerificationType } from '@src/types/auth/SignUpVerificationType';

export const postRequestEmailVerification = async (
  requestEmailVerificationPayload: ISignUpRequestEmailVerificationType,
) => {
  return getAPIResponseData<void, ISignUpRequestEmailVerificationType>({
    url: API.SIGN_UP_REQUEST_EMAIL_VERIFICATION,
    method: 'POST',
    data: requestEmailVerificationPayload,
  });
};
