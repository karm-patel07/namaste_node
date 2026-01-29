const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validate } = require("../utilis/validate");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(req.user);
  } catch (error) {
    res.status(400).send("something went to wrong");
  }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validate(req)) {
      throw new Error("Invalid edit request");
    }

    const loggedInUser = req.user;

    // Body ma avela  fields update karo
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    // only save once 
    await loggedInUser.save();

    res.send(`${loggedInUser.firstName}, your profile updated successfully`);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = {
  profileRouter,
};
