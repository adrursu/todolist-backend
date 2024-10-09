const express = require('express');
const mysql = require('mysql2');
const config = require('./config');
const app = express();

app.use(express.json());

const db = mysql.createConnection(config.database);

// Create Database Table (if not exists)
db.query(`
CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

// Get all todos
app.get('/api/todos', (req, res) => {
    db.query('SELECT * FROM todos', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Create a new todo
app.post('/api/todos', (req, res) => {
    const { title, description } = req.body;
    db.query('INSERT INTO todos (title, description) VALUES (?, ?)', [title, description], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Todo created', id: result.insertId });
    });
});

// Update a todo (mark as completed)
app.put('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    db.query('UPDATE todos SET is_completed = 1 WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Todo updated' });
    });
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM todos WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Todo deleted' });
    });
});

app.listen(3000, () => {
    console.log('Backend API running on port 3000');
});
