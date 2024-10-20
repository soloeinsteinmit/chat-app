const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Initializations
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_DB_URI;

// Middlewares
app.use(express.json());
app.use(cors());

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("\n🛜🛜🛜Connected to MongoDB🛜🛜🛜"))
  .catch((err) =>
    console.log(`\n❌❌❌MongoDB connection error: ${err.message}`)
  );
