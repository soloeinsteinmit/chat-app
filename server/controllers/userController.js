const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const secret = process.env.JWT_SECRET;
  return jwt.sign({ _id }, secret, { expiresIn: "3d" });
};

const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });

    /**
     * Validate username, email and password
     */
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    /**
     * Validate email
     */
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    /**
     * Validate password
     */
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "Password is not strong enough" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new userModel({ username, email, password: hashedPassword });
    await user.save();

    const token = createToken(user._id);

    res.status(201).json({
      _id: user._id,
      username,
      email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signupUser };
