const mongoose = require("mongoose");
const validator = require("validator");
// regex_timeformat = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
// console.log(regex_settimeformat.test("01:00"));
// references for attribute:  https://www.booking.com/attractions/vn/pr7rasvmt1cp-guided-city-sightseeing-walking-tour.html?aid=304142&label=gen173nr-1FCBkoggI46AdIM1gEaPQBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuALQ6rGjBsACAdICJDI5NWEzMDc1LWU1ZDAtNDcwMC05N2YxLTZjNjNkYjU0NjJkNdgCBeACAQ&source=searchresults-product-card&ufi=-3714993&date=2023-07-01&tickets=TOw5NodqFIka%3A1&start_time=08%3A00&ticket_type=OFtyvaXGLrAA

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
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.name) {
    // Extract the name from the email
    const name = this.email.substring(0, this.email.indexOf("@"));
    this.name = name;
  }
  next();
});

module.exports = mongoose.model("User", userSchema, "user");
