import { getAPIResponseData } from '@src/shared/utils';
import { API } from '@src/shared/constants';
import {
  ISignUpConfirmEmailVerificationResponseType,
  ISignUpConfirmEmailVerificationType,
} from '@src/shared/types/auth/SignUpVerificationType';

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
