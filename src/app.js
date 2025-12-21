// const express = require("express");
// const app = express();
// const port = 3000;

// app.get("/ap*i", (req, res) => {
//   res.send("api is called by api url");
// });

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.use("/user", [
//   (req, res, next) => {
//     console.log("this is first route handler 1");
//     //res.send("route handler 1");
//     next();
//   },
//   (req, res, next) => {
//     console.log("this is second route handler 2");
//     //res.send("route handler 2");
//     next();
//   },
//   (req, res, next) => {
//     console.log("this is third route handler 3");
//     //res.send("route handler 3");
//     next();
//   },
//   (req, res, next) => {
//     console.log("this is fourth route handler 4");
//     // res.send("route handler 4");
//     next();
//   },
//   (req, res, next) => {
//     console.log("this is fifth route handler 5");
//     res.send("route handler 5");
//   },
// ]);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

//const adminAuth = require("./middleware/auth");
const express = require("express");

const connectDB = require("./config/database");
const User = require("./models/User");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = 3000;

// // Admin authentication middleware
// app.use("/admin", adminAuth);

// // Admin success route
// app.get("/admin/success", (req, res) => {
//   res.send("Get API is called successfully");
// });

// app.get("/user", (req, res) => {
//   res.send("Get API is called successfully To The  User");
// });

// Server start

connectDB()
  .then(() => {
    console.log("database connection successfully ");

    app.post("/signup", async (req, res) => {
      try {
        const user = new User(req.body); // 👈 data from Postman
        const savedUser = await user.save();

        res.status(201).json({
          message: "User created successfully",
          user: savedUser,
        });
      } catch (err) {
        res.status(400).json({
          error: err.message,
        });
      }
    });
    app.get("/users", async (req, res) => {
      const emailId = req.body.emailId;
      try {
        const users = await User.find({ emailId: emailId }); // fetch all users
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
          return res.status(404).json({
            message: "User not found",
          });
        }

        res.json({
          message: "User deleted successfully",
          deletedUser: user,
        });
      } catch (error) {
        res.status(400).json({
          error: error.message,
        });
      }
    });

    app.listen(port, () => {
      console.log(`Your server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(" not connect to database ");
  });
