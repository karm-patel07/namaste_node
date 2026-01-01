// const express = require("express");

// const connectDB = require("./config/database");
// const User = require("./models/User");
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const { validationsignUpData } = require("./utilis/validation");
// const app = express();

// app.use(express.json());
// const port = 3000;

// connectDB()
//   .then(() => {
//     console.log("database connection successfully ");

//     app.post("/signup", async (req, res) => {
//       try {
//         validationsignUpData(req);

//         const { firstName, lastName, emailId, password } = req.body; // 👈 data from Postman
//         const passwordHash = await bcrypt.hash(password, 10);
//         console.log(passwordHash);

//         const user = new User({
//           firstName,
//           lastName,
//           emailId,
//           password: passwordHash,
//         });
//         const savedUser = await user.save();

//         res.status(201).json({
//           message: "User created successfully",
//           user: savedUser,
//         });
//       } catch (err) {
//         res.status(400).json({
//           error: err.message,
//         });
//       }
//     });
//     app.get("/users", async (req, res) => {
//       const emailId = req.body.emailId;
//       try {
//         const users = await User.find({ emailId: emailId }); // fetch all users
//         res.send(users);
//       } catch (error) {
//         res.status(500).json({ message: "Something went wrong" });
//       }
//     });

//     app.delete("/users", async (req, res) => {
//       const { id } = req.body;

//       try {
//         const user = await User.findByIdAndDelete(id);

//         if (!user) {
//           return res.status(404).json({
//             message: "User not found",
//           });
//         }

//         res.json({
//           message: "User deleted successfully",
//           deletedUser: user,
//         });
//       } catch (error) {
//         res.status(400).json({
//           error: error.message,
//         });
//       }
//     });

//     app.patch("/user", async (req, res) => {
//       const { userId } = req.body;
//       const data = req.body.data;
//       try {
//         await User.findByIdAndUpdate(userId, data);
//         res.send("user updated");
//       } catch (err) {
//         res.send("something went to wrong");
//       }
//     });

//     app.listen(port, () => {
//       console.log(`Your server started on port ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error(" not connect to database ");
//   });

const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middleware/auth");
const { authRouter } = require("./routes/authRouter");
const { profileRouter } = require("./routes/profileRouter");
const { requestRouter } = require("./routes/requestRouter");

const app = express();
app.use(express.json());
app.use(cookieParser());
// ✅ REQUIRED for reading token from cookies

const port = 3000;

connectDB()
  .then(() => {
    console.log("database connection successfully ");

    app.use("/", authRouter);
    app.use("/", profileRouter);
    app.use("/", requestRouter);

    app.listen(port, () => {
      console.log(`Your server started on port ${port}`);
    });
  })
  .catch(() => {
    console.error("not connect to database");
  });
