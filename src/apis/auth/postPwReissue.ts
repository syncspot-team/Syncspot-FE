import { API } from '@src/constants/api';
import { IPwReissueRequestType } from '@src/types/auth/PwReissueRequestType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const postPwReissue = async (
  pwReissueRequestPayload: IPwReissueRequestType,
) => {
  return getAPIResponseData<void, IPwReissueRequestType>({
    url: API.PASSWORD_REISSUE,
    method: 'POST',
    data: pwReissueRequestPayload,
  });
};
