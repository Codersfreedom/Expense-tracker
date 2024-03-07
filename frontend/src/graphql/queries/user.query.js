import { gql } from '@apollo/client';

const GET_AUTH_USER = gql`
  query GetAuthUser {
    authUser {
      _id
      username
      name
      profilePicture
    }
  }
`;
export default GET_AUTH_USER;