import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import MyButton from '../MyButton';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useThread from '@/hooks/api/useThread';
import useComment from '@/hooks/api/useComment';

const CommentFormSchema = z.object({
  content: z.string().min(1, {
    message: 'Comment cannot be null',
  }),
});

const CommentForm = () => {
  const { detailThread } = useThread();
  const { createComment, loading: createCommentLoading } = useComment();
  const form = useForm<z.infer<typeof CommentFormSchema>>({
    resolver: zodResolver(CommentFormSchema),
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof CommentFormSchema>) => {
    await createComment(detailThread?.id as string, data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-5 border-b pb-5"
      >
        <h3>Leave a comment</h3>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Tell us what you think about the thread..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <MyButton
          type="submit"
          isLoading={createCommentLoading}
          isLoadingText="Submiting..."
        >
          Comment
        </MyButton>
      </form>
    </Form>
  );
};

export default CommentForm;
