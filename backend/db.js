const mongoose=require('mongoose');

require('dotenv').config();
const mongoURI=process.env.DB_URI



const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected successfully");
    })
}
module.exports=connectToMongo;
