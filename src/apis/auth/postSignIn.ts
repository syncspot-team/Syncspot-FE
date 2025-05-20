import { API } from '@src/shared/constants';
import { ISignInRequest } from '@src/shared/types/auth/SignInRequestType';
import { ISignInResponse } from '@src/shared/types/auth/SignInResponseType';
import { getAPIResponseData } from '@src/shared/utils';

export const postSignIn = async (signInPayload: ISignInRequest) => {
  return getAPIResponseData<ISignInResponse, ISignInRequest>({
    method: 'POST',
    url: API.SIGN_IN,
    params: signInPayload,
  });
};
