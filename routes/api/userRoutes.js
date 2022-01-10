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

// getting all users and then creating one
router.route("/").get(getUsers).post(createUser);

// getting one user, update, deleting
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// add friend
router.route("/:userId/friends/:friendId").post(addFriend);

// remove friend
router.route("/:userId/friends/:friendId").delete(removeFriend);

module.exports = router;