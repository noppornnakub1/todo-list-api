import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

let todos: Todo[] = [];
let currentId = 1;

app.use(bodyParser.json());

// อ่านข้อมูลทุกรายการ
app.get('/todos', (req: Request, res: Response) => {
  res.json(todos);
});

// สร้างรายการใหม่
app.post('/todos', (req: Request, res: Response) => {
  const newTodo: Todo = {
    id: currentId++,
    task: req.body.task,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// อัปเดตรายการตาม ID
app.put('/todos/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.task = req.body.task !== undefined ? req.body.task : todo.task;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// ลบรายการตาม ID
app.delete('/todos/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Todo list API listening at http://localhost:${port}`);
});