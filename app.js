const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/Todo'); // Ensure you created models/Todo.js

const app = express();

// Middleware: To parse incoming JSON data
app.use(express.json());
app.use(express.static('public')); // Taaki Node.js 'public' folder ko dikha sake

// MongoDB Connection String (Using 'mongodb' service name from docker-compose)
const dbURI = 'mongodb://mongodb:27017/todolist';

mongoose.connect(dbURI)
  .then(() => console.log('Successfully connected to MongoDB ✅'))
  .catch((err) => console.log('Database connection error ❌:', err));

// --- API ROUTES ---

// 1. Home Route: To check if the API is running
app.get('/', (req, res) => {
  res.send('Todo API is Live! Use /todos to manage tasks. 🚀');
});

// 2. GET all todos: Fetch all tasks from the database
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. POST a new todo: Add a new task to the database
app.post('/todos', async (req, res) => {
  const todo = new Todo({
    title: req.body.title
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 4. PUT: Update a specific task by ID (e.g., change title or status)
app.put('/todos/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 5. DELETE: Remove a task from the database by ID
app.delete('/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted successfully! 🗑️" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the Express Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});