const router = require("express").Router();
//import express for routing

//import functions from controller
const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// /api/thought, route. route get to getThought function and post to createThought
router.route("/").get(getThought).post(createThought);

// /api/thought/:thoughtId, route. route get to getSingleThought function, put to updateThought and delete to deleteThought
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

///api/thought/:thoughtId/reactions, route. post to createReaction and delete to deleteReaction
router
  .route("/:thoughtId/reactions")
  .post(createReaction)
  .delete(deleteReaction);

module.exports = router;
