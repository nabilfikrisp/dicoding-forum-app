export const commentEndpoint = (id: string) => {
  const createComment = `/threads/${id}/comments`;
  return {
    createComment,
  };
};
