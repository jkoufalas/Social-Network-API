//imports models
const User = require("../models/User");
const Thought = require("../models/Thought");

//exports functions for use in routes
module.exports = {
  //get user function
  // finds all users from user collection
  // where object id for thoughts and friends, populate with linked data from those collections
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .populate("thoughts")
      .populate("friends")
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //get a single user function
  // finds a single users from user collection
  // where object id for thoughts and friends, populate with linked data from those collections
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("thoughts")
      .populate("friends")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // updates a user from userid in parameters and uses body data to update
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
      .then((user) =>
        //if a user was modified
        !user
          ? res.status(404).json({
              message: "Found no User with that ID",
            })
          : res.json("Updated the User 🎉")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // deletes a user using the paramater userId
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : Thought.deleteMany({ _id: user.thoughts }).then((dbThoughtData) => {
              !dbThoughtData.deletedCount
                ? res.json("Deleted the User 🎉")
                : res.json("Deleted the User and all associated Thoughts 🎉");
            });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //adds to friends to users friends list
  //use friendId as the user Id for the friend
  //use userId as the users Id
  createFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //removes friend from a users friends list
  //use friendId as the user Id for the friend
  //use userId as the users Id
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
