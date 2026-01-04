const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Database Connection
mongoose.connect('mongodb://db:27017/todos')
    .then(() => console.log('✅ MongoDB Connected!'))
    .catch(err => console.log('❌ Connection Error:', err));

const Todo = mongoose.model('Todo', { text: String });

// 1. GET ALL
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// 2. POST (Naya Todo)
app.post('/todos', async (req, res) => {
    const newTodo = new Todo({ text: req.body.text });
    await newTodo.save();
    res.status(201).json(newTodo);
});

// 3. PUT (Update Todo - Ye line missing thi)
app.put('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true });
        res.json(todo);
    } catch (err) { res.status(500).json({ error: "Invalid ID" }); }
});

// 4. DELETE (Mitao Todo - Ye line missing thi)
app.delete('/todos/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted Successfully!" });
    } catch (err) { res.status(500).json({ error: "Invalid ID" }); }
});

app.listen(3000, () => console.log('🚀 Server is running WITH NODEMON MAGIC!'));
