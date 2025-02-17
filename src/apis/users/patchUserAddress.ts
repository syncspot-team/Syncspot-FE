import { API } from '@src/constants/api';
import { IModifyUserAddressRequest } from '@src/types/users/modifyUserAddressRequestType';
import getAPIResponseData from '@src/utils/getAPIResponseData';

export const patchUserAddress = async (
  modifyUserAddressPayload: IModifyUserAddressRequest,
) => {
  return getAPIResponseData<void, IModifyUserAddressRequest>({
    method: 'PATCH',
    url: API.USER_ADDRESS_UPDATE,
    data: modifyUserAddressPayload,
  });
};
