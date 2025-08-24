import generateToken from "../middleware/generateToken.js";
import User from "./user.model.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send("All fields are required");
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }
    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();
    console.log(newUser);
    res.status(201).send("User created successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("All fields are required");
    }
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid credentials");
    }
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }
    const token = await generateToken(user._id);
    res
      .status(200)
      .send({
        token,
        user: { id: user._id, username: user.username, email: user.email },
      });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
