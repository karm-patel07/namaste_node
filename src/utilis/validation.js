const validator = require("validator");

const validationsignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName || !emailId || !password) {
    throw new Error("All fields are required");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password not a strong");
  }

  if (!validator.isEmail(emailId)) {
    throw new Error("email Id is not proper mail format");
  }
};

module.exports = { validationsignUpData };
