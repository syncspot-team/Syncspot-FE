import { API } from '@shared/constants';
import { ISignUpRequest } from '@shared/types/auth/SignUpRequestType';
import { getAPIResponseData } from '@shared/utils';

export const postSignUp = async (signUpPayload: ISignUpRequest) => {
  return getAPIResponseData<void, ISignUpRequest>({
    method: 'POST',
    url: API.SIGN_UP,
    data: signUpPayload,
  });
};
