import { API } from '@src/shared/constants';
import { IPwReissueRequestType } from '@src/shared/types/auth/PwReissueRequestType';
import { getAPIResponseData } from '@src/shared/utils';

export const postPwReissue = async (
  pwReissueRequestPayload: IPwReissueRequestType,
) => {
  return getAPIResponseData<void, IPwReissueRequestType>({
    url: API.PASSWORD_REISSUE,
    method: 'POST',
    data: pwReissueRequestPayload,
  });
};
