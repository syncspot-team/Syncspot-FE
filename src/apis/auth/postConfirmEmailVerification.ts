import { getAPIResponseData } from '@shared/utils';
import { API } from '@shared/constants';
import {
  ISignUpConfirmEmailVerificationResponseType,
  ISignUpConfirmEmailVerificationType,
} from '@shared/types/auth/SignUpVerificationType';

export const postConfirmEmailVerification = async (
  confirmEmailVerificationPayload: ISignUpConfirmEmailVerificationType,
) => {
  return getAPIResponseData<
    ISignUpConfirmEmailVerificationResponseType,
    ISignUpConfirmEmailVerificationType
  >({
    url: API.SIGN_UP_CONFIRM_EMAIL_VERIFICATION,
    method: 'POST',
    data: confirmEmailVerificationPayload,
  });
};
