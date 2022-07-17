import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: [CartItemInsertInput]!, $userId: String!) {
    addToCart(productID: $productId, userID: $userId) {
      status
      message
      error
    }
  }
`;
