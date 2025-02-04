import getAPIResponseData from '@src/utils/getAPIResponseData';
import { API } from '@src/constants/api';
import {
  ISignUpConfirmEmailVerificationResponseType,
  ISignUpConfirmEmailVerificationType,
} from '@src/types/auth/SignUpVerificationType';

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
