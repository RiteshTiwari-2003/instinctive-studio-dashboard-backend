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
    const { name, cohort, courses, status } = req.body;
    
    // Handle the image file if it exists
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const student = await prisma.student.create({
      data: {
        name,
        cohort,
        status,
        imageUrl,
        courses: {
          connect: courses.map(courseId => ({ id: courseId }))
        }
      },
      include: {
        courses: true,
      },
    });
    
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cohort, courses, status } = req.body;
    
    // Handle the image file if it exists
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateData = {
      name,
      cohort,
      status,
      ...(imageUrl && { imageUrl }), // Only include imageUrl if a new file was uploaded
      courses: {
        set: [], // First disconnect all courses
        connect: courses.map(courseId => ({ id: courseId })) // Then connect the new ones
      }
    };

    const student = await prisma.student.update({
      where: { id },
      data: updateData,
      include: {
        courses: true,
      },
    });
    
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.student.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
