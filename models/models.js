//require mongoose and schema from mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userLogSchema = new Schema({

  day: {
    type: Date,
    default: Date.now()
  },
  //excise table declaration 
  exercises: [
    {
      type: {
        type: String,
        trim: true
      },
      name: {
        type: String,
        trim: true
      },
      duration: {
        type: Number
      },
      weight: {
        type: Number  
      },
      reps: {
        type: Number
      },
      sets: {
        type: Number
      }
    }
  ]
},
 {
  toJSON: {
    //this will include virtual properities if included with data
    virtuals: true
  }
}
);

//adds total duration to the schema as a virtual part of the schema
userLogSchema.virtual("totalDuration").get(function() {
// returns the exercise duration as a sum for totalduration
return this.exercises.reduce((total, exercise) => {
  return total + exercise.duration;
}, 0);
});

//decalaring "workout" for the mongoose schema
const Workout = mongoose.model("Workout", userLogSchema);
//module export
module.exports = Workout;


