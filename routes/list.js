const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

// Create a new task
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existingUser = await User.findById(id);
    
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const list = new List({ title, body, user: existingUser._id });
    await list.save();

    existingUser.list.push(list);
    await existingUser.save();

    res.status(200).json({ list });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred while adding the task" });
  }
});

// Update task
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body } = req.body;
    const list = await List.findById(req.params.id);

    if (!list) {
      return res.status(404).json({ message: "Task not found" });
    }

    list.title = title || list.title;
    list.body = body || list.body;

    await list.save();
    res.status(200).json({ message: "Task Updated", list });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred while updating the task" });
  }
});

// Delete task
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    // Directly find and delete the task by its ID
    const task = await List.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Delete the task
    await List.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred while deleting the task" });
  }
});


// Get tasks of a specific user
router.get("/getTasks/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });

    if (list.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }

    res.status(200).json({ list });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred while retrieving tasks" });
  }
});

module.exports = router;
