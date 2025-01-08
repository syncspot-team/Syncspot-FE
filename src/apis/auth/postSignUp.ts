import { API } from '@src/constants/api';
import { ISignUpRequest } from '@src/types/auth/SignUpRequestType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const postSignUp = async (signUpPayload: ISignUpRequest) => {
  return getAPIResponseData({
    method: 'POST',
    url: API.SIGN_UP,
    data: signUpPayload,
  });
};
