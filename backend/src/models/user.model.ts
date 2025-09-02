import mongoose, { Schema, Document } from 'mongoose';

export interface Iuser extends Document{
    name:String,
    email:String,
    dob:String,
    createdAt:Date
} 

const UserSchema=new Schema<Iuser>({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    dob:{
        type:String,
        required:true
    },
},
{
    timestamps:true
});

const UserModel=mongoose.model<Iuser>('user', UserSchema);

export default UserModel;