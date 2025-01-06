import { Slide, toast, ToastContainerProps } from 'react-toastify';
import { TOAST_TYPE, ToastType } from '@src/types/toastType';

interface ICustomToastProps {
  type: ToastType;
  status?: string;
  message: string;
}

export default function CustomToast({
  type,
  status,
  message,
}: ICustomToastProps) {
  const defaultOptions: ToastContainerProps = {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: true,
    closeButton: false,
    pauseOnHover: false,
    draggable: false,
    transition: Slide,
    className: 'flex items-center w-max',
  };

  switch (type) {
    case TOAST_TYPE.SUCCESS:
      return toast.success(
        status ? `[${status}] ${message}` : message,
        defaultOptions,
      );
    case TOAST_TYPE.ERROR:
      return toast.error(
        status ? `[${status}] ${message}` : message,
        defaultOptions,
      );
    case TOAST_TYPE.INFO:
      return toast.info(
        status ? `[${status}] ${message}` : message,
        defaultOptions,
      );
    case TOAST_TYPE.WARNING:
      return toast.warning(
        status ? `[${status}] ${message}` : message,
        defaultOptions,
      );
  }
}
