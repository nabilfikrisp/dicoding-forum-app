import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import MyButton from '../MyButton';
import Tiptap from '../TipTap';
import useThread from '@/hooks/api/useThread';

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Title must be at least 2 characters.',
    })
    .max(180, {
      message: 'Title too long brother',
    }),
  body: z
    .string()
    .min(2, {
      message: 'Thread content must be at least 2 characters.',
    })
    .trim(),
  category: z
    .string()
    .min(2, {
      message: 'Category must be at least 2 characters.',
    })
    .max(20, {
      message: 'Category too long brother',
    })
    .optional()
    .or(z.literal('')),
});

const NewThreadForm = () => {
  const { createThread, loading } = useThread();
  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      body: '',
      category: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    values,
  ) => {
    await createThread(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col gap-5 py-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <h3>
                  Title <span className="text-destructive">*</span>
                </h3>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Input thread title here..."
                  {...field}
                  className="font-semibold text-primary placeholder:opacity-50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <h3>Category</h3>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Input thread category here..."
                  {...field}
                  className="font-semibold text-primary placeholder:opacity-50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <h3>
                  Thread Content <span className="text-destructive">*</span>
                </h3>
              </FormLabel>
              <FormControl>
                <Tiptap description="" onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <MyButton type="submit" isLoading={loading}>
          Post New Thread
        </MyButton>
      </form>
    </Form>
  );
};

export default NewThreadForm;
