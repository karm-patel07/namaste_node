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
const bcrypt = require("bcrypt"); // ✅ FIX 1
const connectDB = require("./config/database");
const User = require("./models/User");
const { validationsignUpData } = require("./utilis/validation");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middleware/auth");

const app = express();
app.use(express.json());
app.use(cookieParser()); // ✅ REQUIRED for reading token from cookies

const port = 3000;

connectDB()
  .then(() => {
    console.log("database connection successfully ");

    app.post("/signup", async (req, res) => {
      try {
        validationsignUpData(req);

        const { firstName, lastName, emailId, password, skill, age } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
          firstName,
          lastName,
          emailId,
          password: passwordHash,
          skill,
          age,
        });

        const savedUser = await user.save();

        res.status(201).json({
          message: "User created successfully",
          user: savedUser,
        });
      } catch (err) {
        res.status(400).json({
          error: err.message, // ✅ FIXED
        });
      }
    });
    app.post("/login", async (req, res) => {
      try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId });

        if (!user) {
          throw new Error("invalid credentials");
        }
        const ispassword = await bcrypt.compare(password, user.password);
        if (ispassword) {
          const token = await jwt.sign({ _id: user._id }, "Dev@Tinder#123", {
            expiresIn: "7d",
          });
          res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000),
          }); //pass token inside the cookie
          res.send("login successfully");
        } else {
          throw new Error("invalid credentials");
        }
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });
    app.post("/profile", userAuth, async (req, res) => {
      try {
        const user = req.user;
        res.send(user);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });

    app.get("/users", async (req, res) => {
      const emailId = req.query.emailId; // ✅ FIX 2
      try {
        const users = await User.find({ emailId });
        res.send(users);
      } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
      }
    });
    app.delete("/users", async (req, res) => {
      const { id } = req.body;

      try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        res.json({
          message: "User deleted successfully",
          deletedUser: user,
        });
      } catch (err) {
        res.status(400).json({
          error: err.message,
        });
      }
    });
    app.patch("/user/:userId", async (req, res) => {
      const { userId } = req.params;
      const data = req.body;

      try {
        const allowedUpdate = ["photoUrl", "age", "about", "gender", "skill"];
        const isUpdateAllowed = Object.keys(data).every((k) =>
          allowedUpdate.includes(k)
        );

        if (!isUpdateAllowed) {
          throw new Error("Update not allowed");
        }

        // skills validation
        if (data?.skill?.length > 10) {
          throw new Error("Skill cannot be more than 10");
        }

        const user = await User.findByIdAndUpdate(userId, data);

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        res.json({
          message: "User updated successfully",
          updatedUser: user,
        });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });

    app.listen(port, () => {
      console.log(`Your server started on port ${port}`);
    });
  })
  .catch(() => {
    console.error("not connect to database");
  });
