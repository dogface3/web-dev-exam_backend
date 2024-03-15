const express = require("express");
const router = express.Router();

const {
    getAllGoals,
    createGoal,
    getOneGoal,
    deleteGoal,
    updateGoal
} = require("../controllers/goalController");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

router.get("/", getAllGoals);

router.post("/", createGoal);

router.get("/:id", getOneGoal);

router.delete("/:id", deleteGoal);

router.put("/:id", updateGoal);

module.exports = router;