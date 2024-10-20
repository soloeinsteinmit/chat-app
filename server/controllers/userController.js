const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

/**
 * Generates a JSON Web Token (JWT) for a given user ID.
 *
 * @param {string} _id - The user ID to generate the token for.
 *
 * @returns {string} The generated JWT.
 */
const createToken = (_id) => {
  const secret = process.env.JWT_SECRET;
  return jwt.sign({ _id }, secret, { expiresIn: "3d" });
};

/**
 * Registers a new user by validating the input fields and saving the user data to the database.
 *
 * @param {Object} req - The request object containing the user's information (username, email, password).
 * @param {Object} res - The response object to send the registration response.
 *
 * @returns {void} Sends a JSON response with the new user's information or an error message.
 */
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

/**
 * Logs in a user by verifying the credentials and generating a token.
 *
 * @param {Object} req - The request object containing the user's email and password.
 * @param {Object} res - The response object to send the login response.
 *
 * @returns {void} Sends a JSON response with the user's information or an error message.
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials " });
    }

    const token = createToken(user._id);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves all users from the database and sends them in the response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 *
 * @returns {void} Sends a JSON response with all users or an error message.
 */
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves a specific user by their ID from the database and sends them in the response.
 *
 * @param {Object} req - The request object containing the user ID.
 * @param {Object} res - The response object to send the user information.
 *
 * @returns {void} Sends a JSON response with the specific user or an error message.
 */
const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signupUser, loginUser, getUsers, getUser };
