const express = require("express");
const {
  signupUser,
  loginUser,
  getUser,
  getUsers,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.get("/getUser/:userId", getUser);

router.get("/", getUsers);

module.exports = router;
