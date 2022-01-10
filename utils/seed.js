const connection = require("../config/connection");
const { Thought, User } = require("../models");
const { seedUsers, seedThoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});

  await Thought.deleteMany({});
 
  await User.collection.insertMany(seedUsers);

  await Thought.collection.insertMany(seedThoughts);

  console.table(seedUsers);
  console.table(seedThoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});