import mongoose from 'mongoose';



const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    age: { 
        type: Number, 
        default: null
    },
    profilePicture: {
       type: String,
        default:null
    }
})


const User = mongoose.model('User',userSchema)

export default User;