const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");

// Initializations
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_DB_URI;

// Middlewares
app.use(express.json());
const corsOptions = {
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Chatterbox API!!!");
});

// Connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("\n🛜🛜🛜Connected to MongoDB🛜🛜🛜"))
  .catch((err) =>
    console.log(`\n❌❌❌MongoDB connection error: ${err.message}`)
  );
