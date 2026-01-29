const validate = (req) => {
  const allowedEditField = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skill",
  ];
  const isEditAllowed = Object.keys(req.body).every((fields) =>
    allowedEditField.includes(fields)
  );
  return isEditAllowed;
};
module.exports = { validate };
