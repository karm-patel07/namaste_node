const express = require("express");
const app = express();
const port = 3000;

// Admin authentication middleware
app.use("/admin", (req, res, next) => {
  const token = "xyzabc";
  const isAdminAuth = token === "xyz";

  if (!isAdminAuth) {
    return res.status(401).send("Unauthorized access");
  } else {
    next(); // move to next route
  }
});

// Admin success route
app.get("/admin/success", (req, res) => {
  res.send("Get API is called successfully");
});

// Server start
app.listen(port, () => {
  console.log(`Your server started on port ${port}`);
});
