const http = require("http");
const { userAuth } = require("./src/middleware/auth");

const server = http.createServer(function (req, res) {
  if (req.url === "/secretdata") {
    res.end("no secret data is here");
  }
  res.end("hello world");
});
server.listen(7777);
