import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UserModel, { Iuser } from '../models/user.model';

declare module "express-serve-static-core"{
    interface Request{
        user?: Iuser
    }
}

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

export const protectedRoute=async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const accessToken=req.cookies.accessToken;
        if(!accessToken)  return res.status(400).json({ message: "Login to use the services!" });
        try{
            const decoded=jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as CustomJwtPayload;

            if(decoded.userId) return res.status(401).json({ message:"Invalid Token!" });

            const user=await UserModel.findById(decoded.userId);
            if(!user) return res.status(401).json({ message:"User Not Found!"});
            req.user=user;
            return next();
        }
        catch(error){
            if(error instanceof jwt.TokenExpiredError) return res.status(401).json({ message:"Please login again from homepage!" });
            throw error;
        }
    }
    catch(error){
        if(error instanceof Error) console.log("Error in protectedRoute middleware:",error.message);
        return res.status(500).json({ message:"Internal Server Error!" });
    }
}