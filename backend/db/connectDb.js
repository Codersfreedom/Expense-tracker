import mongoose from "mongoose";

export const connectDb = async ()=>{
    try {
      const URL =  await  mongoose.connect(process.env.MONGODB_URI);
          console.log(`Connected to database at ${URL.connection.host}`);
        
    } catch (err) {
        console.log(`Error:${err.message}`)
        process.exit(1);
    }
  
}
export default connectDb;