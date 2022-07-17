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
    }
  }
`;
