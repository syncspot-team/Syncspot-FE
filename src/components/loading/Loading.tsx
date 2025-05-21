import LottieLoading from '@assets/lotties/LottieLoading.json';
import Lottie from 'lottie-react';
import { mergeClassNames } from '@shared/utils';

interface LoadingProps {
  className?: string;
}

export const Loading = ({ className }: LoadingProps) => {
  return (
    <div
      className={mergeClassNames('flex items-center justify-center', className)}
    >
      <Lottie animationData={LottieLoading} className="size-24 lg:size-48" />
    </div>
  );
};
