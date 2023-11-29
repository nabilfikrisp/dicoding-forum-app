import { CircleDashed } from 'lucide-react';

const LoadingState = () => {
  return (
    <div className="flex h-full w-[100vw] items-center justify-center">
      <CircleDashed className="animate-spin" />
    </div>
  );
};

export default LoadingState;
