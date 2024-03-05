const transactionTypeDef = `#graphql
type Transaction{
    _id:ID!
    userId:ID!
    description:String!
    paymentType:String!
    category:String!
    amount:Float!
    location:String
    date:String!
}

type Query{
    transactions:[Transaction!]
    transaction(transactionId:ID!):Transaction

}
type Mutation{
    createTransaction(input:createTransactionInput!):Transaction!
    updateTransaction(input:updateTransactionInput!):Transaction!
    deleteTransacton(transactionId:ID!):Transaction!
}
input createTransactionInput {
    description:String!
    paymentType:String!
    category:String!
    amount:Float!
    location:String
    date:String!
}
input updateTransactionInput {
    transactionId:ID!
    description:String
    paymentType:String
    category:String
    amount:Float
    location:String
    date:String
}
input deleteTransacton {
    transactionId:ID!
    message:String!
}
`

export default transactionTypeDef;