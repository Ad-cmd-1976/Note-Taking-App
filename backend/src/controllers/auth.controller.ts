import { Request, Response } from "express";
import jwt  from 'jsonwebtoken';
import UserModel from "../models/user.model";
import { sendOtpMail } from "../lib/helper";

let storeOtp: { [email: string]:string }={};

const setCookie=(res: Response, token: string): void=>{
    res.cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV=="production",
        sameSite:"strict",
        maxAge: 7*24*60*60*1000
    })
}
const generateToken=(userId: string): string=>{
    const accesstoken: string=jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
    return accesstoken;
}

export const generateOtp=async (req : Request, res : Response)=>{
    try{
        const { name, email, dob }=req.body;

        if(!name || !email || !dob){
            return res.status(400).json({ message:"All fields are required!" });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: 'Invalid email address' });
        }

        const existingUser=await UserModel.findOne({ email:email });
        if(existingUser){
            return res.status(400).json({ message: "User Already Exists!" });
        }

        const otp: string=Math.floor(100000 + Math.random()*900000).toString();
        await sendOtpMail(email,otp);
        storeOtp[email]=otp;

        return res.status(201).json({ message:"Otp Sent Successfully" });
    }
    catch(error){
        console.log("Error in generateOtp function of auth controller:", error);
        return res.status(500).json({ message:"Internal Server Error" });
    }
}

export const signup=async (req: Request, res: Response)=>{
    try{
        const { name, email, dob, otp }=req.body;

        if(!name || !dob || !email || !otp){
            return res.status(400).json({ message:"All fields are required! "});
        }
        if(storeOtp[email]!==otp){
            return res.status(400).json({ message:"Invalid or expired otp" });
        }

        const newUser=new UserModel({ name:name, email:email, dob:dob });
        const accessToken: string=generateToken(newUser._id as string);
        setCookie(res, accessToken);
        await newUser.save();
        delete(storeOtp[email]);

        return res.status(201).json({ 
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            message:"Signup Successfull! "
        });
    }
    catch(error){
        console.log("Error in signup function of auth controller", error);
        return res.status(500).json({ message:"Internal Server Error! "});
    }
}

export const login=async (req: Request, res: Response)=>{
    try{
        
    }
    catch(error){
        
    }
}

export const checkAuth=async (req: Request, res: Response)=>{
    try{
        return res.status(200).json({ user: req.user });
    }
    catch(error){
        if(error instanceof Error) console.log("Error in checkAuth function of auth controller", error);
        return res.status(500).json({ message:"Internal Server Error! "});
    }
}