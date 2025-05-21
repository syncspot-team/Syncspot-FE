import { API } from '@shared/constants';
import { ISignInRequest } from '@shared/types/auth/SignInRequestType';
import { ISignInResponse } from '@shared/types/auth/SignInResponseType';
import { getAPIResponseData } from '@shared/utils';

export const postSignIn = async (signInPayload: ISignInRequest) => {
  return getAPIResponseData<ISignInResponse, ISignInRequest>({
    method: 'POST',
    url: API.SIGN_IN,
    params: signInPayload,
  });
};
