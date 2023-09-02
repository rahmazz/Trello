import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userName:{
        required:true,
        type:String,
        unique:true
    },
    fName:{
        required:true,
        type:String,
    },
    lName:{
        required:true,
        type:String,
    },
    email:{
        required:true,
        type:String,
        unique:true,
        lowercase:true,
    },
    confirmemail:{
        type:Boolean,
        default:false,
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        default: "male",
        enum: ["male", "female"],
    },
    age: {
        type: Number,
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    isOnline:{
        type:Boolean,
        default:false
    },
    profileImage:{
        public_id:String,
        secure_url:String
    },
    coverImage:[
    {
        public_id:String,
        secure_url:String
    }
    ],
}, 
{
    timestamps:true
}
)

const userModel = model("User",userSchema)

export default userModel