import prisma from '../config/db.js';

export const getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: {
        courses: true
      }
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: {
        id: req.params.id
      },
      include: {
        courses: true
      }
    });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createStudent = async (req, res) => {
  try {
    const { name, cohort, courses } = req.body;
    const student = await prisma.student.create({
      data: {
        name,
        cohort,
        courses: {
          connect: courses.map(id => ({ id }))
        }
      },
      include: {
        courses: true
      }
    });
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { name, cohort, status, courses } = req.body;
    const student = await prisma.student.update({
      where: {
        id: req.params.id
      },
      data: {
        name,
        cohort,
        status,
        courses: {
          set: courses.map(id => ({ id }))
        }
      },
      include: {
        courses: true
      }
    });
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    await prisma.student.delete({
      where: {
        id: req.params.id
      }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
