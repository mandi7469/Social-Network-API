const { Schema, model } = require("mongoose");

//schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        "Please enter a valid email address!",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    //mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    //this is indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//creates a virtual property `friendCount` that gets the number of user's friends
userSchema
  .virtual("friendCount")
//getter
  .get(function () {
    return this.friends.length;
  });

//initialize our User model
const User = model("user", userSchema);

module.exports = User;
