import { create } from "zustand";
import axios from '../lib/axios';
import { toast } from 'react-hot-toast';

interface User{
    _id: string,
    name: string,
    email: string,
    dob: string
}

interface AuthState{
    user: User | null,
    otpSent: Boolean,
    getOtp: (formData:{ name:string, email:string, otp: string, dob: string })=>void,
    signup: (formData:{ name:string, email:string, otp: string, dob: string })=>void,
}

export const useAuthStore=create<AuthState>((set,get)=>({
    user: null,
    otpSent:false,

    getOtp: async (formData:{ name:string, email:string, otp: string, dob: string })=>{
        try{
            const res=await axios.post('/auth/request-otp', formData);
            set({ otpSent: true });
            console.log(res);
        }
        catch(error){
            console.log("Error in getting Otp", error);
            toast.error(error.response.data.message);
        }
    },

    signup: async (formData: { name:string, email:string, dob: string, otp: string })=>{
        try{
            const res=await axios.post('/auth/signup', formData);
            set({ user: res.data });
            toast.success(res.data.message);
        }
        catch(error){
            console.log("Error in signup function of useAuthStore", error);
            toast.error(error.response.data.message);
        }
    },


}));

export default useAuthStore;