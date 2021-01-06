const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const app = express();
const path = require('path')
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

//view
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/exercise.html"))
});
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/stats.html"))
});

app.post("/submit", ({body} , res) => {
  User.create(body)
  .then(dbUser => {
    res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      })
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

