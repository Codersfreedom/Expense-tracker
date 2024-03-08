import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
    query GetTransactions{

    transactions{
    _id
    description
    paymentType
    category
    amount
    location
    date
        }
    }
`;
export const GET_TRANSACTION = gql`
    query GetTransaction($id:ID!){

    transaction(transactionId:$id){
    _id
    description
    paymentType
    category
    amount
    location
    date
  
        }
        
    }
`

export const GET_CATEGORY_STATISTICS = gql`
    query GetCategoryStatictics{
        categoryStatistics{
            category
            amount
        }
    }
`