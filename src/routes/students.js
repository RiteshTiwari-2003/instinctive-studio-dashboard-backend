import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from '../controllers/studentController.js';
import upload from '../middleware/uploadMiddleware';

const router = express.Router();

// Validation middleware
const validateStudent = [
  body('name').notEmpty().trim().escape(),
  body('cohort').notEmpty().trim().escape(),
  body('courses').isArray(),
  validate
];

router.get('/', getStudents);
router.get('/:id', getStudentById);
router.post('/', upload.single('image'), validateStudent, createStudent);
router.put('/:id', upload.single('image'), validateStudent, updateStudent);
router.delete('/:id', deleteStudent);

export default router;
