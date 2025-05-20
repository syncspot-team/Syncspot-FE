import { API } from '@src/shared/constants';
import { ISignUpRequest } from '@src/shared/types/auth/SignUpRequestType';
import { getAPIResponseData } from '@src/shared/utils';

export const postSignUp = async (signUpPayload: ISignUpRequest) => {
  return getAPIResponseData<void, ISignUpRequest>({
    method: 'POST',
    url: API.SIGN_UP,
    data: signUpPayload,
  });
};
