const connection = require("../config/connection");
const { User, Thought, Reaction } = require("../models");

const users = [
  {
    username: "rachelGreen",
    email: "rgreen@mail.com",
    // thoughtText: "We were NOT on a break",
    // friends: []
  },
  {
    username: "chandlerBing",
    email: "cbing@mail.com",
    // thoughtText: "I'm Chandler, I make jokes when I'm unconfortable",
    // friends: []
  },
  {
    username: "phoebeBuffay",
    email: "pbuffay@mail.com",
    // thoughtText: "Smelly cat, smelly cat, what are they feeding you? Smelly cat, smelly cat, it's not your faaault!",
    // friends: []
  },
  {
    username: "rossGeller",
    email: "rgeller@mail.com",
    // thoughtText: "Someone at work ate my sandwhich. MYYYYYY SANDDWICCCCCCHHHHHHH! That sandwhich was the only good thing going on in my life.",
    // friends: []
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
