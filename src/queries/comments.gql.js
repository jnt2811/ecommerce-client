import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
  query GetCommentOfProduct($productId: String!) {
    getCommentOfProduct(productID: $productId) {
      ID
      FIRST_NAME
      LAST_NAME
      CONTENTS
      USER_ID
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddNewComment($comment: [CommentInsertInput]!) {
    addNewComment(comment: $comment) {
      status
      message
      error
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation RemoveComment($comment: CommentUpdateInput) {
    removeComment(comment: $comment) {
      status
      message
      error
    }
  }
`;
