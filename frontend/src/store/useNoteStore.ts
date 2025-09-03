import { create } from "zustand";
import axios from '../lib/axios';
import { toast } from 'react-hot-toast';
import type { AxiosError } from "axios";

interface Note{
  _id: string;
  title: string;
  content: string;
}

interface NoteState{
    isLoading:Boolean;
    notes:Note[];
    title: string;
    content:string;
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    getAllNotes: ()=>void;
    createNote: (formData:{ title:string, content:string })=>void;
    deleteNote: (id: string)=>void;
}

export const useNoteStore=create<NoteState>((set,get)=>({
    isLoading:false,
    notes:[],
    title: '',
    content:'',
    setTitle: (title) => set({ title }),
    setContent: (content) => set({ content }),
    
    getAllNotes: async ()=>{
        set({ isLoading:true })
        try{
            const res=await axios.get('/note');
            set({ notes: res.data.notes });
        }
        catch(err){
            const error = err as AxiosError<{ message: string }>;
            if (error.response?.data?.message) toast.error(error.response.data.message);
            else toast.error("Something went wrong!");
        }
    },
    
    createNote:async (formData:{ title:string, content:string })=>{
        try{
            const res=await axios.post('/note/create', formData);
            toast.success(res.data.message);
            get().getAllNotes();
            set({ title:'', content:'' });
        }
        catch(err){
            const error = err as AxiosError<{ message: string }>;
            if (error.response?.data?.message) toast.error(error.response.data.message);
            else toast.error("Something went wrong!");
        }
    },
    
    deleteNote:async (id: string)=>{
        try{
            const res=await axios.delete(`/note/delete/${id}`);
            toast.success(res.data.message);
            get().getAllNotes();
        }
        catch(err){
            const error = err as AxiosError<{ message: string }>;
            if (error.response?.data?.message) toast.error(error.response.data.message);
            else toast.error("Something went wrong!");
        }
    }
}));

export default useNoteStore;