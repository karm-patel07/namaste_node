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

const adminAuth = require("./middleware/auth");
const express = require("express");
const app = express();
const port = 3000;

// Admin authentication middleware
app.use("/admin", adminAuth);

// Admin success route
app.get("/admin/success", (req, res) => {
  res.send("Get API is called successfully");
});

app.get("/user", (req, res) => {
  res.send("Get API is called successfully To The  User");
});

// Server start
app.listen(port, () => {
  console.log(`Your server started on port ${port}`);
});
