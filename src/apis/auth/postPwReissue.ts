import { API } from '@shared/constants';
import { IPwReissueRequestType } from '@shared/types/auth/PwReissueRequestType';
import { getAPIResponseData } from '@shared/utils';

export const postPwReissue = async (
  pwReissueRequestPayload: IPwReissueRequestType,
) => {
  return getAPIResponseData<void, IPwReissueRequestType>({
    url: API.PASSWORD_REISSUE,
    method: 'POST',
    data: pwReissueRequestPayload,
  });
};
