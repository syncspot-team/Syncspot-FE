import LottieSearchLocation from '@src/assets/lotties/LottieSeachLocation.json';
import Lottie from 'lottie-react';

export default function SeachLocationLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white-default">
      <Lottie
        animationData={LottieSearchLocation}
        className="size-48 lg:size-72"
      />
    </div>
  );
}
