const connection = require("../config/connection");
const { User, Thought } = require("../models");
const {
  getRandomName,
  getRandomThought,
  getRandomReaction,
  usernamesList,
} = require("./data");
const ObjectId = require("mongodb").ObjectId;

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  await Thought.deleteMany({});
  await User.deleteMany({});

  let userIDs = [];

  let user;

  for (let i = 0; i < 5; i++) {
    const username = getRandomName(i);
    const email = `${username}@email.com`;
    const thoughtText = getRandomThought();

    const reactionData = {
      reactionBody: getRandomReaction(),
      username: getRandomName(Math.floor(Math.random() * usernamesList.length)),
    };

    let newThought = await Thought.create({
      thoughtText: thoughtText,
      username: username,
      reactions: reactionData,
    });

    let friend = userIDs[Math.floor(Math.random() * userIDs.length)];
    user = {
      username,
      email,
    };

    let newUser = await User.create(user);
    userIDs.push(newUser._id);
    await User.findOneAndUpdate(
      { _id: newUser._id },
      { $addToSet: { thoughts: newThought._id } },
      { new: true }
    );
    await User.findOneAndUpdate(
      { _id: newUser._id },
      { $addToSet: { friends: ObjectId(friend) } },
      { new: true }
    );
  }

  // loop through the saved videos, for each video we need to generate a video response and insert the video responses
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
