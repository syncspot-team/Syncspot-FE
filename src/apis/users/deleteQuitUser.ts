import { API } from '@src/constants/api';
import { IQuitUserRequestType } from '@src/types/users/quitUserRequestType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const deleteQuitUser = async (quitUserPayload: IQuitUserRequestType) => {
  return getAPIResponseData<void, IQuitUserRequestType>({
    method: 'DELETE',
    url: API.QUIT_USER,
    data: quitUserPayload,
  });
};
