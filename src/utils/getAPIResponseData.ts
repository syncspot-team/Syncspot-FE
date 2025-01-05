import { instance } from '@src/apis/instance';
import { AxiosRequestConfig } from 'axios';

const getAPIResponseData = async <T, D = T>(option: AxiosRequestConfig<D>) => {
  try {
    const { data } = await instance<T>(option);
    return data;
  } catch (e) {
    throw e;
  }
};

export default getAPIResponseData;
