import express from 'express';
import { protectedRoute } from '../middlewares/protected.middleware';
import { getAllNotes, createNote, deleteNote } from '../controllers/note.controller';

const router=express.Router();

router.get("/", protectedRoute, getAllNotes);
router.post('/create', protectedRoute, createNote);
router.delete('/delete/:id', protectedRoute, deleteNote);

export default router;