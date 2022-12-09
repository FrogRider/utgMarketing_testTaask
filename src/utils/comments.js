export const getComments = (comments, postId) => {
  const result = comments.filter((comment) => {
    return comment.postId == postId;
  });

  return result;
}
export const getCommentsQuantity = (comments, postId) => {
  return getComments(comments, postId).length;
}