import { Loader2 } from 'lucide-react';

import { Button, type ButtonProps } from '@/components/ui/button';

type MyButtonProps = {
  isLoading?: boolean;
  isLoadingText?: string;
} & ButtonProps;

export default function MyButton({
  isLoading = false,
  isLoadingText = 'Loading...',
  ...props
}: MyButtonProps) {
  if (isLoading) {
    return (
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {isLoadingText}
      </Button>
    );
  }
  return <Button {...props} />;
}
