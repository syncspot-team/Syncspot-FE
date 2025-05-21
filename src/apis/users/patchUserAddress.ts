import { API } from '@shared/constants';
import { IModifyUserAddressRequest } from '@shared/types/users/modifyUserAddressRequestType';
import { getAPIResponseData } from '@shared/utils';

export const patchUserAddress = async (
  modifyUserAddressPayload: IModifyUserAddressRequest,
) => {
  return getAPIResponseData<void, IModifyUserAddressRequest>({
    method: 'PATCH',
    url: API.USER_ADDRESS_UPDATE,
    data: modifyUserAddressPayload,
  });
};
