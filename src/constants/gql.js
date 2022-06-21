import { gql } from "@apollo/client";

export const getCategories = gql`
  query Mutation {
    getCategories {
      ID
      CATEGORIES_NAME
      CREATE_AT
      UPDATE_AT
      STATE
    }
  }
`;
