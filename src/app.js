const express = require("express");
const app = express();
const port = 3000;

// app.get("/ap*i", (req, res) => {
//   res.send("api is called by api url");
// });

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use("/user", [
  (req, res, next) => {
    console.log("this is first route handler 1");
    //res.send("route handler 1");
    next();
  },
  (req, res, next) => {
    console.log("this is second route handler 1");
    //res.send("route handler 2");
    next();
  },
  (req, res, next) => {
    console.log("this is third route handler 1");
    //res.send("route handler 3");
    next();
  },
  (req, res, next) => {
    console.log("this is fourth route handler 1");
    // res.send("route handler 4");
    next();
  },
  (req, res, next) => {
    console.log("this is fifth route handler 1");
    res.send("route handler 5");
  },
]);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
