const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Goal = require("../models/goalModel");

const goals = [
    {
        title: "sample title",
        description: "sample descreption",
        date: "2020-12-12",
        location: "sample location"
    },
    {
        title: "sample title2",
        description: "sample descreption2",
        date: "2020-11-11",
        location: "sample location2"
    },
];

let token = null;

beforeAll(async () => {
    await User.deleteMany({});
    const result = await api
        .post("/api/users/signup")
        .send({email: "matti@matti.fi", password: "R3g5T7#gh"});
        token = result.body.token;
});

describe("given tehre are some goals saved", () => {
    beforeEach(async () => {
        await Goal.deleteMany({});
        await api
            .post("/api/goals")
            .set("Authorization", "bearer" + token)
            .send(goals[0])
            .send(goals[1]);
});

it("should return all goals as JSON when GET /api/goals is called", async () => {
    await api
    .get("/api/goals")
    .set("Authorization", "bearer " + token)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
 
it("should create one goal when POST /api/goals is called ", async () => {
    const newGoal = {
        title: "sample title3",
        description: "sample descreption3",
        targetDate: "2020-10-10",
        location: "sample location3"
    };
    await api
        .post("/api/goals")
        .set("Authorization", "bearer " + token)
        .send(newGoal)
        .expect(201);
});

it("should return one goal by ID when GET /api/fitness/:id is called", async () => {
    const goal = await Goal.findOne();
    await api
    .get("/api/goals/" + goal._id)
    .set("Authorization", "bearer " + token)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

it("should update one goal by ID when PUT /api/fitness/:id is called", async () => {
    const goal = await Goal.findOne();
    const updatedGoal = {
        title: "sample title4",
        description: "sample descreption4",
        targetDate: "2020-11-11",
        location: "sample location4"
    };
    await api
        .put("/api/goals/" + goal._id)
        .set("Authorization", "bearer " + token)
        .send(updatedGoal)
        .expect(200)
    const updatedGoalCheck = await Goal.findById(goal._id);
    expect(updatedGoalCheck.toJSON()).toEqual(
        expect.objectContaining(updatedGoal)
    );
}); 

it("should delete one goal  by ID when DELETE /api/fitness/:id is called", async () => {
    const goal = await Goal.findOne();
    await api
        .delete("/api/goals/" + goal._id)
        .set("Authorization", "bearer " + token)
        .expect(200);
        const goalCheck = await Goal.findById(goal._id);
        expect(goalCheck).toBeNull();
});

});

afterAll(() => {
    mongoose.connection.close();
});