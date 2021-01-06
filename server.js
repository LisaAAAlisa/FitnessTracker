const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const db = require("./models");
const app = express();
const path = require('path')

const PORT = process.env.PORT || 3002;



app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", {
  useNewUrlParser: true,
  useFindAndModify: false
});
mongoose.set("useUnifiedTopology", true);

// routes
// app.use(require("./routes/api.js"));

//html routes
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/exercise.html"))
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/stats.html"))
});

//api routes
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(data => {
      res.json(data)
    })
})

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then(data => {
      res.json(data)
    })
})

app.post("/api/workouts", (req, res) => {
  db.Workout.create({})
    .then(newWorkout => {
      res.json(newWorkout)
    })
})

app.put("/api/workouts/:id", (req, res) => {
  db.Workout.updateOne({ _id: req.params.id },
    {
      $push: { exercises: req.body }
    }).then(dbUpdated => {
      res.send(dbUpdated);
    })
})


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});


