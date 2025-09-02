import { create } from "zustand";
import axios from '../lib/axios';
import { toast } from 'react-hot-toast';
import type { AxiosError } from "axios";

interface User{
    _id: string,
    name: string,
    email: string,
    dob: string
}

interface AuthState{
    user: User | null,
    isLoading: Boolean,
    otpSent: Boolean,
    getOtp: (formData:{ name:string, email:string, otp: string, dob: string })=>void,
    signup: (formData:{ name:string, email:string, otp: string, dob: string })=>void,
    checkAuth: ()=>void,
}

export const useAuthStore=create<AuthState>((set)=>({
    user: null,
    otpSent:false,
    isLoading:false,

    getOtp: async (formData:{ name:string, email:string, otp: string, dob: string })=>{
        try{
            const res=await axios.post('/auth/request-otp', formData);
            set({ otpSent: true });
            console.log(res);
        }
        catch(err){
            const error = err as AxiosError<{ message: string }>;
            if (error.response?.data?.message) toast.error(error.response.data.message);
            else toast.error("Something went wrong!");
        }
    },

    signup: async (formData: { name:string, email:string, dob: string, otp: string })=>{
        try{
            const res=await axios.post('/auth/signup', formData);
            set({ user: res.data });
            toast.success(res.data.message);
        }
        catch(err){
            const error = err as AxiosError<{ message: string }>;
            if (error.response?.data?.message) toast.error(error.response.data.message);
            else toast.error("Something went wrong!");
        }
    },
    
    checkAuth: async ()=>{
        try{
            const res=await axios.post('/auth/checkAuth');
            set({ user: res.data.user });
        }
        catch(err){
            const error = err as AxiosError<{ message: string }>;
            if (error.response?.data?.message) toast.error(error.response.data.message);
            else toast.error("Something went wrong!");
        }
    },
}));

export default useAuthStore;