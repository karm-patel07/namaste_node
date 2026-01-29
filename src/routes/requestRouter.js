const express = require("express");
const requestRouter = express.Router();

// ✅ Correct destructuring for middleware
const { userAuth } = require("../middleware/auth");

// ✅ Correct model import, use Capital C & R
const ConnectionRequest = require("../models/connectionRequest");

// ---------------- SEND REQUEST ----------------
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const { status, toUserId } = req.params;

      if (!["interested", "ignored"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      return res.json({
        message: "Request sent successfully",
        data,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
);

// ---------------- ACCEPT / REJECT ----------------
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;

      if (!["accepted", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const request = await ConnectionRequest.findByIdAndUpdate(
        requestId,
        { status },
        { new: true },
      );

      return res.json({
        message: `Request ${status}`,
        request,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
);

module.exports = { requestRouter };
