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
      const user = new User([
        {
          firstName: "kk",
          lastName: "patel",
          emailId: "abc@test.com",
          password: "abc123",
          age: 23,
          gender: "Male",
        },
        {
          firstName: "Rahul",
          lastName: "Sharma",
          emailId: "rahul@test.com",
          password: "rahul123",
          age: 24,
          gender: "Male",
        },
        {
          firstName: "Priya",
          lastName: "Mehta",
          emailId: "priya@test.com",
          password: "priya123",
          age: 22,
          gender: "Female",
        },
        {
          firstName: "Aman",
          lastName: "Patel",
          emailId: "aman@test.com",
          password: "aman123",
          age: 27,
          gender: "Male",
        },
        {
          firstName: "Neha",
          lastName: "Verma",
          emailId: "neha@test.com",
          password: "neha123",
          age: 25,
          gender: "Female",
        },
      ]);
      try {
        await user.save();
        res.send("user data add successfully");
      } catch (err) {
        res.status(400).send("some error occur ", +err.massage);
      }
    });
    app.get("/users", async (req, res) => {
      try {
        const users = await User.find(); // fetch all users
        res.json(users);
      } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
      }
    });

    app.listen(port, () => {
      console.log(`Your server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(" not connect to database ");
  });
