require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

const { userAuth } = require("./middleware/auth");
const { authRouter } = require("./routes/authRouter");
const { profileRouter } = require("./routes/profileRouter");
const userRouter = require("./routes/userRouter");

const { requestRouter } = require("./routes/requestRouter");
const User = require("./models/User");
const app = express();
app.use(express.json());
app.use(cookieParser()); // ✅ REQUIRED for reading token from cookies
const port = 3000;
connectDB()
  .then(() => {
    console.log("database connection successfully ");
    app.use("/", authRouter);
    app.use("/", profileRouter);
    app.use("/Api", requestRouter);

    app.use("/", userRouter);

    app.listen(port, () => {
      console.log(`Your server started on port ${port}`);
      console.log("JWT_SECRET:", process.env.JWT_SECRET);
    });
  })
  .catch(() => {
    console.error("not connect to database");
  });
