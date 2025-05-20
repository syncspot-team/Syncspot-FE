import { API } from '@src/shared/constants';
import { IQuitUserRequestType } from '@src/shared/types/users/quitUserRequestType';
import { getAPIResponseData } from '@src/shared/utils';

export const deleteQuitUser = async (quitUserPayload: IQuitUserRequestType) => {
  return getAPIResponseData<void, IQuitUserRequestType>({
    method: 'DELETE',
    url: API.QUIT_USER,
    data: quitUserPayload,
  });
};
