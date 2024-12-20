import prisma from '../config/db.js';

export const getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        students: true
      }
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: req.params.id
      },
      include: {
        students: true
      }
    });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { name, curriculum } = req.body;
    const course = await prisma.course.create({
      data: {
        name,
        curriculum
      }
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { name, curriculum } = req.body;
    const course = await prisma.course.update({
      where: {
        id: req.params.id
      },
      data: {
        name,
        curriculum
      }
    });
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    await prisma.course.delete({
      where: {
        id: req.params.id
      }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
