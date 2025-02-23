import LottieGlobalLoading from '@src/assets/lotties/LottieGlobalLoading.json';
import Lottie from 'lottie-react';

export const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white-default">
      <Lottie
        animationData={LottieGlobalLoading}
        className="size-48 lg:size-80"
      />
    </div>
  );
};
