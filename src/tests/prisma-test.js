import prisma from '../config/db.js';

async function testPrismaConnection() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('Successfully connected to the database');

    // Create a test student
    const student = await prisma.student.create({
      data: {
        name: 'Test Student',
        cohort: 'AY 2024-25'
      }
    });
    console.log('Created test student:', student);

    // Query all students
    const students = await prisma.student.findMany();
    console.log('All students:', students);

    // Clean up test data
    await prisma.student.delete({
      where: {
        id: student.id
      }
    });
    console.log('Cleaned up test data');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testPrismaConnection();
