import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
  mutation UserLogin($username: String!, $password: String!) {
    userLogin(username: $username, password: $password) {
      status
      message
      error
      token
      refreshToken
      user {
        ID
        EMAIL
        CREATE_AT
        UPDATE_AT
        STATE
        FIRST_NAME
        LAST_NAME
        DATE_OF_BIRTH
        GENDER
        NATIONALITY
        ADDRESS
        PHONE_NUMBER
      }
    }
  }
`;

export const USER_SIGNUP = gql`
  mutation AddNewUser($users: [UserInsertInput]!) {
    addNewUser(users: $users) {
      status
      message
      error
      token
      refreshToken
      user {
        ID
        EMAIL
        CREATE_AT
        UPDATE_AT
        STATE
        FIRST_NAME
        LAST_NAME
        DATE_OF_BIRTH
        GENDER
        NATIONALITY
        ADDRESS
        PHONE_NUMBER
      }
    }
  }
`;

export const GET_USER_AND_CART = gql`
  query GetUsers($userId: String) {
    getCart(userID: $userId) {
      ID
      USER_ID
      PRODUCT_ID
      PRODUCT_NAME
      PRICE
      DELIVERY_PRICE
      COUNT_PRODUCT
      GALLERY
      PRODUCT_OPTIONS
    }
    getUsers(ID: $userId) {
      ID
      EMAIL
      CREATE_AT
      UPDATE_AT
      STATE
      FIRST_NAME
      LAST_NAME
      DATE_OF_BIRTH
      GENDER
      NATIONALITY
      ADDRESS
      PHONE_NUMBER
    }
  }
`;
