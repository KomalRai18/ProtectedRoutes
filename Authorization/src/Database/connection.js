import mongoose from "mongoose";
async function connectDB(){
    try {
         await mongoose.connect('mongodb://127.0.0.1:27017/UserDatabase')
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error(error); 
    }
}
export default connectDB;
