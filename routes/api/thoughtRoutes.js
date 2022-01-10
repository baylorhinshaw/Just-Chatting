const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  removeThought,
  updateThought,
  createReaction,
  removeReaction,
} = require("../../controllers/thoughtController.js");

// all thoughts and making one
router.route("/").get(getThoughts).post(createThought);

// getting one thought, update, or delete
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(removeThought);

// creating thought 
router.route("/:userId/thoughts").post(createThought);

// removing a thought 
router.route("/:userId/thoughts/:thoughtId").delete(removeThought);

// create reaction to a thought
router.route("/:thoughtId/reaction/").post(createReaction);

// remove reaction from thought
router.route("/:thoughtId/reaction/:reactionId").delete(removeReaction);

module.exports = router;