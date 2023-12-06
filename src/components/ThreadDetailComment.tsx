import CommentForm from './forms/CommentForm';
import CommentCard from './CommentCard';
import { type TComment } from '@/interfaces/comment.interface';

const EmptyState = () => {
  return (
    <h4 className="text-center text-base">Be the first one to comment!</h4>
  );
};

const ThreadDetailComment = ({ comments }: { comments: TComment[] }) => {
  return (
    <div className="flex w-full flex-col gap-5">
      <CommentForm />
      <h4>Comments ({comments.length})</h4>
      <div className="flex flex-col gap-5">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCard comment={comment} key={comment.id} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default ThreadDetailComment;
