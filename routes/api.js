const router = require("express").Router();
const workout = require("../models/workout.js");

router.post("/api/workout", ({ body }, res) => {
  workout.create(body)
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/api/workout/bulk", ({ body }, res) => {
  workout.insertMany(body)
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workout", (req, res) => {
  workout.find({})
    .sort({ date: -1 })
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

db.workout.find({}).then(dbworkout => {

  dbworkout.forEach(workout => {
      var total = 0;
      workout.exercises.forEach(e => {
          total += e.duration;
      });
      workout.totalDuration = total;
      res.json(dbworkout);
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;
