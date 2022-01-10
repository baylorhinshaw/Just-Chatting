const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// getting all users / creating a user
router.route("/").get(getUsers).post(createUser);

// get a single user / delete a user / update a user by id
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// Add a friend to user
router.route("/:userId/friends/:friendId").post(addFriend);

// Delete a friend from user
router.route("/:userId/friends/:friendId").delete(removeFriend);

module.exports = router;