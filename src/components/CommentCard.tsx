import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import dayjs from '@/utils/dayJs.config';
import {
  CircleUserRoundIcon,
  Loader2,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from 'lucide-react';
import parse from 'html-react-parser';
import useComment from '@/hooks/api/useComment';
import useAuth from '@/hooks/api/useAuth';
import useThread from '@/hooks/api/useThread';
import { type TComment } from '@/interfaces/comment.interface';

const CommentCard = ({ comment }: { comment: TComment }) => {
  const { loading, upVoteComment, neutralizeVoteComment, downVoteComment } =
    useComment();
  const { myProfile } = useAuth();
  const { detailThread, loading: threadLoading } = useThread();
  const userHasUpvoted = comment.upVotesBy.includes(myProfile?.id as string);
  const userHasDownvoted = comment.downVotesBy.includes(
    myProfile?.id as string,
  );
  return (
    <div className="flex flex-col border-b pb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="w-6">
            <AvatarImage src={comment.owner?.avatar} />
            <AvatarFallback>
              <CircleUserRoundIcon />
            </AvatarFallback>
          </Avatar>
          <h4 className="text-base">{comment.owner.name}</h4>
        </div>
        <small>{dayjs(comment.createdAt).fromNow()}</small>
      </div>
      <div className="paragraph mb-4">{parse(comment.content)}</div>
      <div className="flex items-center justify-start gap-3 ps-1">
        <div className="flex items-start justify-start gap-2">
          {loading || threadLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ThumbsUpIcon
              fill={userHasUpvoted ? 'hsl(var(--primary))' : ''}
              onClick={async () => {
                if (!loading) {
                  if (userHasUpvoted) {
                    await neutralizeVoteComment(
                      detailThread?.id as string,
                      comment.id,
                    );
                  } else {
                    await upVoteComment(detailThread?.id as string, comment.id);
                  }
                }
              }}
            />
          )}

          {comment.upVotesBy.length}
        </div>
        <div className="flex items-start justify-start gap-2">
          {loading || threadLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ThumbsDownIcon
              fill={userHasDownvoted ? 'hsl(var(--destructive))' : ''}
              onClick={async () => {
                if (!loading) {
                  if (userHasDownvoted) {
                    await neutralizeVoteComment(
                      detailThread?.id as string,
                      comment.id,
                    );
                  } else {
                    await downVoteComment(
                      detailThread?.id as string,
                      comment.id,
                    );
                  }
                }
              }}
            />
          )}

          {comment.downVotesBy.length}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
