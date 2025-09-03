import mongoose, { Document, Schema } from 'mongoose';

interface Inote extends Document{
    title: string,
    content: string,
    user: mongoose.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}

export const NoteSchema=new Schema<Inote>({
    title:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
},{
    timestamps:true
});

const NoteModel=mongoose.model<Inote>("note", NoteSchema);

export default NoteModel;