import mongoose from "mongoose";

let isConnected = false;

async function connectToDB(){
    if(isConnected){
        console.log("Mongodb is connected")
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI);

        isConnected = true;
        console.log("Mongodb connected");
    }   
    catch(error){
        console.log(error);
    }
}

export default connectToDB;