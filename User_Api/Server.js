const express = require("express");

const app = express();
const PORT = 5000;

app.use(express.json()); 
let users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
];

// to get user all users
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

// to add a new user to the list
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: `User with ID ${userId} not found` });
  }

  users.splice(userIndex, 1);
  res.status(200).json({ message: `User deleted successfully` });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
