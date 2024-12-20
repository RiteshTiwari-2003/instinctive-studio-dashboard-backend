import express from 'express';
import { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent } from '../controllers/studentController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Get all students
router.get('/', getAllStudents);

// Get student by ID
router.get('/:id', getStudentById);

// Create a new student with image upload
router.post('/', upload.single('image'), createStudent);

// Update a student with optional image upload
router.put('/:id', upload.single('image'), updateStudent);

// Delete a student
router.delete('/:id', deleteStudent);

export default router;
