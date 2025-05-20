import { API } from '@src/shared/constants';
import { IModifyUserAddressRequest } from '@src/shared/types/users/modifyUserAddressRequestType';
import { getAPIResponseData } from '@src/shared/utils';

export const patchUserAddress = async (
  modifyUserAddressPayload: IModifyUserAddressRequest,
) => {
  return getAPIResponseData<void, IModifyUserAddressRequest>({
    method: 'PATCH',
    url: API.USER_ADDRESS_UPDATE,
    data: modifyUserAddressPayload,
  });
};
