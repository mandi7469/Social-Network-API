const { User, Thought } = require("../models");

//get all users
module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("thoughts")
        .populate("friends");

      if (!user) {
        return res.status(404).json({ message: "No user with that ID!" });
      }

      res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID!" });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({message: "User, thoughts and reactions deleted!"});
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //add a friend
  async addFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId} },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res.status(404).json({ message: "No user with that ID!" });
      }

      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete a friend
  async deleteFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId} },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res.status(404).json({ message: "No user with that ID!" });
      }

      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
