export const VOTE_ENDPOINT = (id: string) => {
  const UP_VOTE_THREAD = `/threads/${id}/up-vote`;
  const DOWN_VOTE_THREAD = `/threads/${id}/down-vote`;
  const NEUTRALIZE_VOTE_THREAD = `/threads/${id}/neutral-vote`;

  return {
    UP_VOTE_THREAD,
    DOWN_VOTE_THREAD,
    NEUTRALIZE_VOTE_THREAD,
  };
};
