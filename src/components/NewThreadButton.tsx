import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';
import { type ClassValue } from 'clsx';

const NewThreadButton = ({
  className,
  onClick,
}: {
  className?: ClassValue;
  onClick?: () => void;
}) => {
  return (
    <button
      className={cn(
        `flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-primary transition-all duration-300  ease-in-out hover:h-14 hover:w-14 hover:-translate-x-1 hover:-translate-y-1 hover:opacity-75`,
        className,
      )}
      onClick={onClick}
    >
      <PlusIcon strokeWidth="3" />
    </button>
  );
};

export default NewThreadButton;
