import { getAPIResponseData } from '@shared/utils';
import { API } from '@shared/constants';
import { ISignUpRequestEmailVerificationType } from '@shared/types/auth/SignUpVerificationType';

export const postRequestEmailVerification = async (
  requestEmailVerificationPayload: ISignUpRequestEmailVerificationType,
) => {
  return getAPIResponseData<void, ISignUpRequestEmailVerificationType>({
    url: API.SIGN_UP_REQUEST_EMAIL_VERIFICATION,
    method: 'POST',
    data: requestEmailVerificationPayload,
  });
};
