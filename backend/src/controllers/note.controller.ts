import { Request, Response } from 'express';
import NoteModel from '../models/note.model';
import { Iuser } from "../models/user.model";

export const getAllNotes=async (req: Request, res: Response)=>{
    try{
        const userId=req.user!._id;
        const notes=await NoteModel.find({ user: userId }).sort({ createdAt: -1 });
        return res.status(201).json({ notes: notes });
    }
    catch(error){
        if(error instanceof Error) console.log("Error in getAllNotes function of note controller", error);
        res.status(500).json({ message:"Internal Server Error!" });
    }
}

export const createNote=async (req: Request, res: Response)=>{
    try{
        const { title, content }=req.body;
    
        if(!title || !content ) return res.status(400).json({ message:"Title and Content are required!" });
    
        const newNote=await NoteModel.create({ 
            title:title,
            content:content,
            user: req.user!._id
        });
    
        return res.status(201).json({
            note:newNote,
            message: "Note Created Successfully!"
        });
    }
    catch(error){
        if(error instanceof Error) console.log("Error in createNote funtion of note controller", error);
        res.status(500).json({ message:"Internal Server Error!" });
    }
}

export const deleteNote=async (req: Request, res: Response)=>{
    try{
        const { id }=req.params;
        const note=await NoteModel.findByIdAndDelete(id)
        
        if (!note) return res.status(404).json({ message: "Note not found" });
        
        return res.status(200).json({ message: "Note deleted successfully" });
    }
    catch(error){
        if(error instanceof Error) console.log("Error in deleteNote funtion of note controller", error);
        res.status(500).json({ message:"Internal Server Error!" });
    }
}