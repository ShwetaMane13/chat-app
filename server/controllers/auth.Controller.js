const { connect } = require("getstream");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const StreamChat = require("stream-chat").StreamChat;

require("dotenv").config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_API_ID;

const signup = async (req, res) => {
  try {
    const { fullName, username, password, phoneNumber } = req.body;
    const client = StreamChat.getInstance(api_key, api_secret);
    const { users } = await client.queryUsers({ name: username });
    console.log("at signup");
    if (users) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const userId = crypto.randomBytes(16).toString("hex");

    const serverClient = connect(api_key, api_secret, app_id);

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = serverClient.createUserToken(userId);

    return res.status(200).json({
      token,
      fullName,
      username,
      userId,
      hashedPassword,
      phoneNumber,
    });
  } catch (e) {
    console.log("e", e);
    return res.status(500).json({
      error: e.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const serverClient = connect(api_key, api_secret, app_id);
    const client = StreamChat.getInstance(api_key, api_secret);
    // console.log("at login");
    const { users } = await client.queryUsers({ name: username });

    if (!users.length) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const success = await bcrypt.compare(password, users[0].hashedPassword);
    const token = serverClient.createUserToken(users[0].id);

    if (success) {
      // console.log("login success");
      return res.status(200).json({
        token,
        fullName: users[0].fullName,
        username,
        userId: users[0].id,
      });
    } else {
      // console.log("wrong pass at login");
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: e.message,
    });
  }
};

module.exports = {
  login,
  signup,
};
