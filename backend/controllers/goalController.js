const mongoose = require("mongoose");
const Goal = require("../models/GoalModel");

// gets all goals
const getAllGoals = async (req, res) => {
  const user_id = req.user._id;

  try {
    const goals = await Goal.find({user_id});
    res.status(200).json(goals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// creates a new goal
const createGoal = async (req, res) => {
    const { title, description, targetDate, location } = req.body;
    
    try {

    const user_id = req.user._id;
    
    const newGoal = new Goal({  
        title,
        description,
        targetDate,
        location,
        user_id,
    });

    await newGoal.save();

    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// gets one goal
const getOneGoal = async (req, res) => {
  const user_id = req.user._id;
  const { id } = req.params;

  try {
    const goal = await Goal.findById(id).where("user_id").equals(user_id);

    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// deletes a goal
const deleteGoal = async (req, res) => {
  const user_id = req.user._id;
  const { id } = req.params;
  try {
    const user_id = req.user._id;
    const goal = await Goal.findByIdAndDelete({ _id: id, user_id: user_id });
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// updates a goal
const updateGoal = async (req, res) => {
  const user_id = req.user._id;
  const { id } = req.params;
  const { title, description, targetDate, location } = req.body;

  try {
    const goal = await Goal.findByIdAndUpdate(
      { _id: id, user: user_id },
      { ...req.body },
      { new: true }
    );

    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllGoals,
  createGoal,
  getOneGoal,
  deleteGoal,
  updateGoal,
};
