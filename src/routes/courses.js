import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} from '../controllers/courseController.js';

const router = express.Router();

// Validation middleware
const validateCourse = [
  body('name').notEmpty().trim().escape(),
  body('curriculum').notEmpty().trim().escape(),
  validate
];

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', validateCourse, createCourse);
router.put('/:id', validateCourse, updateCourse);
router.delete('/:id', deleteCourse);

export default router;
