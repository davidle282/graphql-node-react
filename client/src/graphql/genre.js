import { gql } from "@apollo/client";

export const GET_GENRES = gql`
  query {
    genres {
      id
      name
      image
      description
    }
  }
`;
