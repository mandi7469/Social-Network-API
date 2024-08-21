const connection = require("../config/connection");
const { User, Thought, Reaction } = require("../models");

const users = [
  {
    username: "rachelGreen",
    email: "rgreen@mail.com",
    thoughts: [],
    friends: []
  },
  {
    username: "chandlerBing",
    email: "cbing@mail.com",
    thoughts: [],
    friends: []
  },
  {
    username: "phoebeBuffay",
    email: "pbuffay@mail.com",
    thoughts: [],
    friends: []
  },
  {
    username: "rossGeller",
    email: "rgeller@mail.com",
    thoughts: [],
    friends: []
  },
  
];

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  await User.deleteMany({});
  await Thought.deleteMany({});
  await User.collection.insertMany(users);

  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
