export const voteEndpoint = (id: string) => {
  const upVoteThread = `/threads/${id}/up-vote`;
  const downVoteThread = `/threads/${id}/down-vote`;
  const neutralizeVoteThread = `/threads/${id}/neutral-vote`;

  return {
    upVoteThread,
    downVoteThread,
    neutralizeVoteThread,
  };
};
