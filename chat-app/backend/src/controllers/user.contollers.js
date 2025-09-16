import User from "../models/User.js";

export const getMe = async (req, res, next) => {
  try {
    let user = await User.findById(req.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUsers = async (req, res, next) => {
  let search = req.query.search || "";
  try {
    let users = await User.find({
      username: { $regex: search, $options: "i" },
      _id: { $ne: req.userId },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
