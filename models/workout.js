const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  date: {
    type: Date,
    // default: Date.now
  },
  exercises: [
    {
      name: {
        type: String,
      },
      type: {
        type: String,
      },
      weight: {
        type: Number,
      },      
      sets: {
        type: Number
      },
      reps: {
        type: Number,
      },
      duration: {
        type: Number,
      },
      distance: {
        type: Number
      }
    }]
});

const workout = mongoose.model("workout", workoutSchema);

module.exports = workout;