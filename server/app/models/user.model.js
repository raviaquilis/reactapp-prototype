const mongoose = require("mongoose");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.statics.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const expire = Date.now() + 10 * 60 * 1000;
  /*this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");*/
  //this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return { token: resetToken, expire: expire };
};

const User = mongoose.model("User", userSchema);
module.exports = User;
