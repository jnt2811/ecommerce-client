import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  query GetOrders($userId: String, $id: String) {
    getOrders(userID: $userId, ID: $id) {
      ID
      USER_ID
      NAME
      PHONE_NUMBER
      ADDRESS
      DELIVERY_METHOD
      DELIVERY_STATE
      TOTAL_PRICE
      CREATE_AT
      UPDATE_AT
      PRODUCTS {
        ID
        PRODUCT_NAME
        DETAILS
        DESCRIPTION
        PRODUCT_OPTIONS
        NUMBER_PRODUCT
        GALLERY
        PRICE
        QUANTITY
        CREATE_AT
        UPDATE_AT
        PRODUCT_LOCK
        STATE
      }
    }
  }
`;

export const ADD_NEW_ORDER = gql`
  mutation AddNewOrder($order: OrderInsertInput) {
    addNewOrder(order: $order) {
      status
      message
      error
    }
  }
`;
