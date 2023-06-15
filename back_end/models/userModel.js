const mongoose = require("mongoose");
// const PurchaseTicket = require("./purchaseTicketModel");
// const Activity = require("./activitiesModel");
const validator = require("validator");


const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      require: [true, "missing email field"],
      unique: [true, "email already been used"],
      lowercase: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      require: [true, "missing password field"],
    },
    avatar: {
      type: String,
      default: "/img/sample_avatar.jpg",
    },
    tickets: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "PurchaseTicket" }],
      default: [],
    },
    activities: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // // check tickets existed
  // if (this.tickets && this.tickets.length > 0) {
  //   const found = await PurchaseTicket.find({ _id: { $in: this.tickets } });
  //   if (found.length != this.tickets.length) {
  //     const missing = this.tickets.filters((item) => !found.includes(item));
  //     this.invalidate("tickets", `tickets: ${missing.join(" ")} is not existed`);
  //     return next(new Error("Validation error"));
  //   }
  // }

  // // check activities existed
  // if (this.activities && this.activities.length > 0) {
  //   const found = await Activity.find({ _id: { $in: this.activities } });
  //   if (found.length != this.tickets.length) {
  //     const missing = this.activities.filters((item) => !found.includes(item));
  //     this.invalidate("activities", `activities: ${missing.join(" ")} is not existed`);
  //     return next(new Error("Validation error"));
  //   }
  // }

  // Extract the name from the email
  if (!this.name) {
    const name = this.email.substring(0, this.email.indexOf("@"));
    this.name = name;
  }
  next();
});

module.exports = mongoose.model("User", userSchema, "user");
