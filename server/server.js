const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin : "https://task-management-1-8649.onrender.com",
    credentials: true
}));
app.use(express.json());

// Database Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
const tasksRouter = require('./routes/tasks');
const authRouter = require('./routes/auth');

app.use('/api/tasks', tasksRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Task Management API is running');
});

// Start Server
app.listen(PORT, () => {
 
  console.log(`Server is running on port ${PORT}`);
});
