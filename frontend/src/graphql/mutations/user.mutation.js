import { gql } from "@apollo/client";

// Define mutation
export const SIGN_UP = gql`
  mutation signUp($input: SignupInput!) {
    signUp(input: $input) {
      _id
      name
      username
    }
  }
`;
export const LOGIN = gql`
  mutation login($input:LoginInput!){
    login(input:$input){
      username
      password
    }
  }
`;

export const LOGOUT = gql`
  mutation logout{
    logout{
      message
    }
  }
`;