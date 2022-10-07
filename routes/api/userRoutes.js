const router = require("express").Router();
//import express for routing

//import functions from controller
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend,
} = require("../../controllers/userController");

// /api/users, route. route get to getUsers function and post to createUser
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId, route. route get to getSingleUser function, put to updateUser and delete to deleteUser
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId, route. post to createFriend and delete to deleteFriend
router
  .route("/:userId/friends/:friendId")
  .post(createFriend)
  .delete(deleteFriend);

module.exports = router;
