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
    user: User | null;
    name: string;
    dob: string;
    email: string;
    otp: string;
    loginOtp: string;
    loginEmail: string;
    setname: (title: string) => void;
    setdob: (dob: string) => void;
    setemail: (email: string) => void;
    setotp: (otp: string) => void;
    setLoginEmail: (loginEmail: string)=> void;
    setLoginOtp: (loginOtp: string)=> void;
    isLoading: Boolean;
    otpSent: Boolean;
    getSignupOtp: (formData:{ name:string, email:string, otp: string, dob: string })=>void;
    signup: (formData:{ name:string, email:string, otp: string, dob: string })=>void;
    getLoginOtp: (formData:{ loginEmail:string, loginOtp: string })=>void;
    login: (formData:{ loginEmail:string, loginOtp:string })=>void;
    logout: ()=>void;
    checkAuth: ()=>void;
}

export const useAuthStore=create<AuthState>((set)=>({
    user: null,
    name: "",
    dob: "",
    email: "",
    otp: "",
    loginEmail:"",
    loginOtp:"",
    otpSent:false,
    isLoading:true,
    setname: (name) => set({ name }),
    setdob: (dob) => set({ dob }),
    setemail: (email) => set({ email }),
    setotp: (otp)=> set({ otp }),
    setLoginOtp: (loginOtp)=> set({ loginOtp }),
    setLoginEmail: (loginEmail)=> set({ loginEmail }),




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
            set({ user: res.data, otpSent: false });
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
    
    getLoginOtp: async (formData:{ loginEmail:string, loginOtp:string })=>{
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
    
    login: async (formData: { loginEmail:string, loginOtp: string })=>{
        set({ isLoading:true });
        try{
            const res=await axios.post('/auth/login', formData);
            set({ user: res.data, otpSent: false });
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
    
    logout: async ()=>{
        try{
            const res=await axios.post('/auth/logout');
            toast.success(res.data.message);
            set({ user: null })
        }
        catch(err){
            const error = err as AxiosError<{ message: string }>;
            if (error.response?.data?.message) toast.error(error.response.data.message);
            else toast.error("Something went wrong!");
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