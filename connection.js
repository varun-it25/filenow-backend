import mongoose from "mongoose";

export async function connection(str){
    try{
        await mongoose.connect(str);
        console.log(`MongoDB Connected...`)
    }
    catch(err){
        console.log(err);
    }
}
