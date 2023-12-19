import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import MyButton from '../MyButton';
// import useAuth from '@/hooks/api/useAuth';

const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

type TLoginFormSchema = z.infer<typeof LoginFormSchema>;

const LoginForm = ({
  login,
  loading,
}: {
  login: (data: TLoginFormSchema) => void;
  loading?: boolean;
}) => {
  const form = useForm<TLoginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit: SubmitHandler<TLoginFormSchema> = (data) => {
    login(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col justify-center space-y-8"
      >
        <h1>Login</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe@gmail.com"
                  {...field}
                  type="email"
                  className="font-semibold text-primary placeholder:opacity-50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your secret code..."
                  {...field}
                  type="password"
                  className="font-semibold text-primary placeholder:opacity-50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <MyButton type="submit" isLoading={loading}>
          Submit
        </MyButton>
        <div>
          Don&apos;t have account?{' '}
          <Link to="/register" className="text-primary hover:underline">
            Register now!
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
