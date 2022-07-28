import { gql } from "@apollo/client";

export const GET_CART = gql`
  query GetCart($userId: String) {
    getCart(userID: $userId) {
      ID
      USER_ID
      PRODUCT_ID
      PRODUCT_NAME
      PRICE
      DELIVERY_PRICE
      COUNT_PRODUCT
      PRODUCT_OPTIONS
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
  mutation RemoveItemFromCart($id: [String]!) {
    removeItemFromCart(ID: $id) {
      status
      message
      error
    }
  }
`;
