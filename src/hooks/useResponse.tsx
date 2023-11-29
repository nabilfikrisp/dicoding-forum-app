import { useToast } from '@/components/ui/use-toast';

const useResponse = () => {
  const { toast } = useToast();
  const handleSuccess = (message: string) => {
    toast({
      variant: 'success',
      title: 'Success',
      description: message,
    });
  };

  const handleError = (message: string, code: number) => {
    switch (code) {
      case 400:
        toast({
          variant: 'destructive',
          title: `Error ${code}`,
          description: message,
        });
        break;
      case 401:
        toast({
          variant: 'destructive',
          title: `Error ${code}`,
          description: message,
        });
        break;
      default:
        toast({
          variant: 'destructive',
          title: `Error ${code}`,
          description: message,
        });
        break;
    }
  };

  return { handleSuccess, handleError };
};

export default useResponse;
