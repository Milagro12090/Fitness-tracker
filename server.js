//requiring mongojs, mongoose, morgan, express, and path
require('dotenv').config()
const express = require("express");
const logger = require("morgan");
const mongojs = require('mongojs')
const mongoose = require("mongoose");
const path = require('path')


//port 3001 cuz my port 3000 is messed from another activity lolololol
const PORT = process.env.PORT || 3001;


//require models for mongo
const User = require("./models/models");
const app = express();
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

  //route for homepage
  app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  })
  //route for exercise page
  app.get("/exercise", (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'exercise.html'));
  })
  //route for stat page
  app.get('/stats', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stats.html'))
  })
  
  //getting apis

  //api for workout
  app.get("/api/workouts", (_, res) => {
    User.find()
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.json(err);
      });
  });
 
  app.post("/api/workouts", (_, res) => {
    User.create({})
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.json(err);
      });
  });
  //api for adding workouts
  app.put("/api/workouts/:id", ({body, params}, res) => {
    User.findByIdAndUpdate(params.id, 
      {$push:{exercises:body}}, 
      {new:true, runValidators: true})
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.json(err);
      });
  });
 
  //app.get for workout range
  app.get('/api/workouts/range', (_, res) => {
    User.find()
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.json(err);
      });
  });
 
//app.listen for port
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
