const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

//schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: [1, "Must be 1 character or more!"],
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//create a virtual property `reactionCount` that gets the number of reactions
thoughtSchema
.virtual("reactionCount")
//getter
.get(function () {
  return this.reactions.length;
});

//initialize our Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
