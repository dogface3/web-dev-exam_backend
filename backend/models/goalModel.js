const mongoose = require("mongoose");


const GoalModel = new mongoose.Schema({
    title: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    targetDate: {
        type: Date, required: true},
    location: {
        type: String, required: true},
    user_id: {
        type: String, required: true},
});

module.exports = mongoose.model("Goal", GoalModel);