const userTypeDef = `#graphql
    type User {
        _id:String!
        username:String!
        name:String!
        password:String!
        profilePicture:String
        gender:String!

    }

    type Query {
        authUser:User
        user(userId:ID!):User
    }
    type Mutation {
        signUp(input:SignupInput!):User
        login(input:LoginInput!):User
        logout:LogoutResponse
    }

    input SignupInput{
        username:String!
        name:String!
        password:String!
        gender:String!
    }
    input LoginInput{
        username:String!
        password:String!
    }
    type LogoutResponse{
        message:String!
    }


`;
export default userTypeDef;
