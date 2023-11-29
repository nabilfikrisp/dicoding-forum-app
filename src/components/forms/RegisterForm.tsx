import { useForm, SubmitHandler } from 'react-hook-form';
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
import { TRegistrationReqBody } from '@/redux/features/user/userRegistrationSlice';
import useRegister from '@/hooks/api/useRegister';
import { MyButton } from '../MyButton';

const RegisterFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Username must be at least 6 characters.',
  }),
});

const RegisterForm = () => {
  const { register, loading } = useRegister();
  const form = useForm<TRegistrationReqBody>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const onSubmit: SubmitHandler<TRegistrationReqBody> = (data) => {
    register(data);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col justify-center space-y-8"
      >
        <h1>Register</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                  type="text"
                  className="font-semibold text-primary placeholder:opacity-50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          Already have account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Login now!
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
