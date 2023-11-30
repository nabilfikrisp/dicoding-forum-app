export const COMMENT_ENDPOINT = (id: string) => {
  const CREATE_COMMENT = `/threads/${id}/comments`;
  const UP_VOTE_COMMENT = (commentId: string) =>
    `/threads/${id}/comments/${commentId}/up-vote`;
  const DOWN_VOTE_COMMENT = (commentId: string) =>
    `/threads/${id}/comments/${commentId}/down-vote`;
  const NEUTRALIZE_VOTE_COMMENT = (commentId: string) =>
    `/threads/${id}/comments/${commentId}/neutral-vote`;

  return {
    CREATE_COMMENT,
    UP_VOTE_COMMENT,
    DOWN_VOTE_COMMENT,
    NEUTRALIZE_VOTE_COMMENT,
  };
};
