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
    getSignupOtp: (formData:{ name:string, email:string, otp: string, dob: string })=>void,
    getLoginOtp: (formData:{ email:string, otp: string })=>void,
    signup: (formData:{ name:string, email:string, otp: string, dob: string })=>void,
    login: (formData:{ email:string, otp:string })=>void,
    checkAuth: ()=>void,
}

export const useAuthStore=create<AuthState>((set)=>({
    user: null,
    otpSent:false,
    isLoading:true,

    getSignupOtp: async (formData:{ name:string, email:string, otp: string, dob: string })=>{
        set({ isLoading:true });
        try{
            const res=await axios.post('/auth/request-signup-otp', formData);
            toast.success(res.data.message); 
            set({ otpSent: true });
        }
        catch(err){
            const error = err as AxiosError<{ message: string }>;
            if (error.response?.data?.message) toast.error(error.response.data.message);
            else toast.error("Something went wrong!");
        }
        finally{
            set({ isLoading:false });
        }
    },
    
    signup: async (formData: { name:string, email:string, dob: string, otp: string })=>{
        set({ isLoading:true });
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
        finally{
            set({ isLoading:false });
        }
    },
    
    getLoginOtp: async (formData:{ email:string, otp:string })=>{
        set({ isLoading:true });
        try{
            const res=await axios.post('/auth/request-login-otp', formData);
            toast.success(res.data.message); 
            set({ otpSent: true });
        }
        catch(err){
            const error = err as AxiosError<{ message: string }>;
            if (error.response?.data?.message) toast.error(error.response.data.message);
            else toast.error("Something went wrong!");
        }
        finally{
            set({ isLoading:false });
        }
    },
    
    login: async (formData: { email:string, otp: string })=>{
        set({ isLoading:true });
        try{
            const res=await axios.post('/auth/login', formData);
            set({ user: res.data });
            toast.success(res.data.message);
        }
        catch(err){
            const error = err as AxiosError<{ message: string }>;
            if (error.response?.data?.message) toast.error(error.response.data.message);
            else toast.error("Something went wrong!");
        }
        finally{
            set({ isLoading:false });
        }
    },
    
    checkAuth: async ()=>{
        set({ isLoading:true });
        try{
            const res=await axios.post('/auth/checkAuth');
            set({ user: res.data.user });
        }
        catch(err){
            const error = err as AxiosError<{ message: string }>;
            if (error.response?.data?.message) toast.error(error.response.data.message);
            else toast.error("Something went wrong!");
        }
        finally{
            set({ isLoading:false });
        }
    },
}));

export default useAuthStore;