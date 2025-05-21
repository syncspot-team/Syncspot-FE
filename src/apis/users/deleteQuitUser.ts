import { API } from '@shared/constants';
import { IQuitUserRequestType } from '@shared/types/users/quitUserRequestType';
import { getAPIResponseData } from '@shared/utils';

export const deleteQuitUser = async (quitUserPayload: IQuitUserRequestType) => {
  return getAPIResponseData<void, IQuitUserRequestType>({
    method: 'DELETE',
    url: API.QUIT_USER,
    data: quitUserPayload,
  });
};
