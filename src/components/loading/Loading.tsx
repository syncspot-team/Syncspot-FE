import LottieLoading from '@src/assets/lotties/LottieLoading.json';
import Lottie from 'lottie-react';
import { mergeClassNames } from '@src/utils/mergeClassNames';

interface LoadingProps {
  className?: string;
}

export const Loading = ({ className }: LoadingProps) => {
  return (
    <div
      className={mergeClassNames('flex items-center justify-center', className)}
    >
      <Lottie animationData={LottieLoading} className="size-48" />
    </div>
  );
};
