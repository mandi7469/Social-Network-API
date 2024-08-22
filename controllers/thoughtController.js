const { User, Thought } = require("../models");

//get all thoughts
module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .populate("reactions");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID!" });
      }

      res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID!',
        })
      }

      res.json({ thought, user });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID!" });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({message: 'No user with that ID!'});
      }
      
      res.json({message: "Thought successfully deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //add a reaction
  async addReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true }
      );

      if (!reaction) {
        return res.status(404).json({ message: "No thought with that ID!" });
      }

      res.json(reaction);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //delete a reaction
  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res.status(404).json({ message: "No thought with this ID!" });
      }

      res.json(reaction);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
