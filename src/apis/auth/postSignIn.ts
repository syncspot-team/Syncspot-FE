import { API } from '@src/constants/api';
import { ISignInRequest } from '@src/types/auth/SignInRequestType';
import { ISignInResponse } from '@src/types/auth/SignInResponseType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const postSignIn = async (signInPayload: ISignInRequest) => {
  return getAPIResponseData<ISignInResponse, ISignInRequest>({
    method: 'POST',
    url: API.SIGN_IN,
    params: signInPayload,
  });
};
