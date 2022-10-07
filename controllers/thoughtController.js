//imports models
const User = require("../models/User");
const Thought = require("../models/Thought");

//exports functions for use in routes
module.exports = {
  //get thought function
  // finds all thoughts from thought collection
  getThought(req, res) {
    Thought.find()
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //get single thought function
  // finds a single thought from thought collection
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(dbThoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        // add thought to user
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought created, but found no user with that ID",
            })
          : res.json("Created the Thought 🎉")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //update thought, find thoughts with param, set with body, since body contains any combo of keys it will update those key values
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    )
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({
              message: "Found no thought with that ID",
            })
          : res.json("Updated the Thought 🎉")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //delete thought by finding with param

  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({
              message: "No thought with that ID",
            })
          : res.json("Deleted the Thought 🎉")
      )
      .catch((err) => res.status(500).json(err));
  },

  //create new reaction with body details, finding thought with param
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //delete reaction finds thought with param id, deletes from reactions list by pulling reaction key, using schema to find sub key for reaction "reactions.reactionId"
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
