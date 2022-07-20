import { gql } from "@apollo/client";

export const GET_CART = gql`
  query GetCart($userId: String) {
    getCart(userID: $userId) {
      ID
      USER_ID
      PRODUCT_ID
      COUNT_PRODUCT
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: [CartItemInsertInput]!, $userId: String!) {
    addToCart(productID: $productId, userID: $userId) {
      status
      message
      error
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveItemFromCart($productId: [String]!, $userId: String!) {
    removeItemFromCart(productID: $productId, userID: $userId) {
      status
      message
      error
    }
  }
`;