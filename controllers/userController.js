const { User, Thought } = require('../models');

const userCount = async () => 
    User.aggregate()
        .count('userCount')
        .then((numberOfUsers) => numberOfUsers);

// Aggregate function for getting the overall grade using $avg
// look at Mini Project 28, 18-NoSQL

module.exports = {
    // Get all Users
    getUsers(req, res) {
      User.find()
        .then(async (Users) => {
          const userObj = {
            Users,
            userCount: await userCount(),
          };
          return res.json(userObj);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // Get a single User
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then(async (User) =>
          !User
            ? res.status(404).json({ message: 'No User with that ID' })
            : res.json({
                User,
                grade: await grade(req.params.UserId),
              })
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // Create a new User
    createUser(req, res) {
      User.create(req.body)
        .then((User) => res.json(User))
        .catch((err) => res.status(500).json(err));
    },
    // Delete a User and remove them from the course
    deleteUser(req, res) {
      User.findOneAndRemove({ _id: req.params.userId })
        .then((User) =>
          !User
            ? res.status(404).json({ message: 'No such User exists' })
            : Thought.findOneAndUpdate(
                { Users: req.params.UserId },
                { $pull: { Users: req.params.UserId } },
                { new: true }
              )
        )
        .then((thought) =>
          !thought
            ? res.status(404).json({
                message: 'User deleted, but no thoughts found',
              })
            : res.json({ message: 'user successfully deleted' })
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    // Add a thought to a user
    addThought(req, res) {
      console.log('You are adding an thought');
      console.log(req.body);
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: req.body } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'No user found with that ID :(' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Remove thought from a user
    removeThought(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { thought: { thoughtId: req.params.thoughtId } } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'No user found with that ID :(' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
  };