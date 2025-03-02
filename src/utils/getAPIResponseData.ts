import { instance } from '@src/apis/instance';
import { AxiosError, AxiosRequestConfig } from 'axios';

const getAPIResponseData = async <T, D = T>(option: AxiosRequestConfig<D>) => {
  try {
    const { data } = await instance<T>(option);
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.data.status === 500) {
        localStorage.clear();
        window.location.href = '/';
      }
    }
    throw e;
  }
};

export default getAPIResponseData;
