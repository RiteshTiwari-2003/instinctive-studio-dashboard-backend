import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import studentRoutes from './routes/students.js';
import courseRoutes from './routes/courses.js';
import adminRoutes from './routes/admin.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '5000');

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use(errorHandler);

const findAvailablePort = async (startPort) => {
  let port = startPort;
  
  while (port < startPort + 10) { // Try up to 10 ports
    try {
      await new Promise((resolve, reject) => {
        const server = app.listen(port)
          .once('listening', () => {
            server.close();
            resolve();
          })
          .once('error', (err) => {
            if (err.code === 'EADDRINUSE') {
              reject(new Error('Port in use'));
            } else {
              reject(err);
            }
          });
      });
      return port; // Port is available
    } catch (err) {
      if (port === startPort + 9) {
        throw new Error('No available ports found');
      }
      port++;
    }
  }
};

const startServer = async () => {
  try {
    const availablePort = await findAvailablePort(PORT);
    app.listen(availablePort, () => {
      console.log(`Server is running on port ${availablePort}`);
      // Update the API URL in the frontend environment
      console.log(`Frontend should use: VITE_API_URL=http://localhost:${availablePort}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
