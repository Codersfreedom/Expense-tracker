
import {users} from "../dummyData/Data.js"

const userResolver = {
   
    Query:{
        users: ()=> users,
        user: (_,{userId})=>{
            return users.find((user)=>user._id===userId);
        }
    },
    Mutation:{}
}

export default userResolver;