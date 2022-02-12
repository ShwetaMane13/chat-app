const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/auth.js");

const app = express();
const PORT = process.env.port || 5000;

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
