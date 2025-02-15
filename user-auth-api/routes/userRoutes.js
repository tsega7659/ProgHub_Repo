const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();


let users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
];
 
router.get("/", authenticateToken, (req, res) => {
  res.status(200).json(users);
});


router.post("/", authenticateToken, (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ message: "Name and email required" });

  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);

  res.status(201).json(newUser);
});


router.delete("/:id", authenticateToken, (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) return res.status(404).json({ message: "User not found" });

  users.splice(userIndex, 1);
  res.status(200).json({ message: `User with ID ${userId} deleted successfully` });
});

module.exports = router;
