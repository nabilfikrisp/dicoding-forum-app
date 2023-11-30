import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import dayjs from '@/utils/dayJs.config';
import {
  CircleUserRoundIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from 'lucide-react';
import parse from 'html-react-parser';
import { TComment } from '@/redux/features/comment/commentSlice';

const CommentCard = ({ comment }: { comment: TComment }) => {
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
          <h4 className="text-base">
            {comment.owner ? comment.owner.name : 'Anonymus'}
          </h4>
        </div>
        <small>{dayjs(comment.createdAt).fromNow()}</small>
      </div>
      <div className="paragraph mb-4">{parse(comment.content)}</div>
      <div className="flex items-center justify-start gap-3 ps-1">
        <div className="flex items-start justify-start gap-2">
          {/* {voteLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : ( */}
          <ThumbsUpIcon
            fill={true ? 'hsl(var(--primary))' : ''}
            // onClick={() => {
            //   if (!voteLoading) {
            //     if (userHasUpvoted) {
            //       neutralizeVoteThread(thread.id);
            //     } else {
            //       upVoteThread(thread.id);
            //     }
            //   }
            // }}
          />
          {/* )} */}

          {comment.upVotesBy.length}
        </div>
        <div className="flex items-start justify-start gap-2">
          {/* {voteLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : ( */}
          <ThumbsDownIcon
            fill={true ? 'hsl(var(--destructive))' : ''}
            // onClick={() => {
            //   if (!voteLoading) {
            //     if (userHasDownvoted) {
            //       neutralizeVoteThread(thread.id);
            //     } else {
            //       downVoteThread(thread.id);
            //     }
            //   }
            // }}
          />
          {/* )} */}

          {comment.downVotesBy.length}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
