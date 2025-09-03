import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './lib/db';
import authRoutes from './routes/auth.route';
import cookieParser from 'cookie-parser';
import noteRoutes from './routes/note.route';

dotenv.config();

const app=express();
const PORT=process.env.PORT as string || 8080;

app.use(cors({
    origin:["http://localhost:5173", process.env.CLIENT_URL as string],
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/note', noteRoutes);

app.listen(PORT, ()=>{
    console.log(`Server running at PORT: ${PORT}`);
    connectDb();
})