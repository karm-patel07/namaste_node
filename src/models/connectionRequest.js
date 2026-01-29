const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignore", "interested", "accepted", "rejected"],
        message: `{VALUE} is not a correct status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

// index for faster queries
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

// validation: cannot send request to self
// connectionRequestSchema.pre("save", function (next) {
//   if (this.fromUserId.equals(this.toUserId)) {
//     return next(new Error("Cannot send connection request to yourself"));
//   }
//   next();
// });

module.exports = mongoose.model("connectionRequest", connectionRequestSchema);
