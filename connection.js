import mongoose from "mongoose";

export async function connection(str){
    try{
        mongoose.connect(str);
        console.log(`MongoDB Connected...`)
    }
    catch(err){
        console.log(err);
    }
}