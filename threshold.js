const crypto = require("crypto");
const fs = require("fs");
process.env.UV_THREADPOOL_SIZE = 1024;
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (error, key) => {
  console.log("1 crypto pbkdf2 done");
});
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (error, key) => {
  console.log("2 crypto pbkdf2 done");
});
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (error, key) => {
  console.log("3 crypto pbkdf2 done");
});
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (error, key) => {
  console.log("4 crypto pbkdf2 done");
});
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (error, key) => {
  console.log("5 crypto pbkdf2 done");
});
