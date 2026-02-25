require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/task");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

app.get("/", (req, res) => {
  res.send("API running...");
});

app.post("/register", async (req, res) => {
  res.json({
    success:true,
    data: req.body,
    message:"User Registered successfully",
    user: {
     name : req.body.name,
     email : req.body.email,
    },
    token: ""
  });
});


app.post("/tasks", async (req, res) => {
  const { title, userId } = req.body;

  const task = await Task.create({ title, userId });

  res.json({ success: true, task });
});

app.get("/tasks/:userId", async (req, res) => {
  const tasks = await Task.find({ userId: req.params.userId });
  res.json(tasks);
});

app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.put("/tasks/:id/toggle", async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.completed = !task.completed;
  await task.save();
  res.json(task);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));