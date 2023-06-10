const mongoose = require("mongoose");
const activitiesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Missing name field"],
    },
    short_description: {
      type: String,
      required: [true, "Missing short_description field"],
    },
    image: {
      type: [String],
      default: [],
    },
    duration: {
      min_duration: {
        type: Number,
        validate: {
          validator: function (v) {
            return v > 0;
          },
          message: (props) => `duration.min_duration need to be greater than 0`,
        },
        required: [true, `Missing duration.min_duration field`],
      },
      max_duration: {
        type: Number,
        validate: {
          validator: function (v) {
            return v >= this.duration.min_duration;
          },
          message: (props) =>
            `duration.max_duration need to be greater or equal to than duration.min_duration`,
        },
        required: [true, `Missing duration.max_duration field`],
      },
      average: {
        type: Number,
        default: 0,
      },
    },
    rating: {
      type: Number,
      min: [0, "Less than min value which is 0"],
      max: [5, "Less than min value which is 5"],
      default: 0,
    },
    free_cancellation_available: {
      type: Boolean,
      default: false,
    },
    city: {
      type: String,
      required: [true, "Missing city field"],
    },
    detail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ActDetail",
    },
  },
  { timestamps: true }
);

activitiesSchema.pre("save", function (next) {
  this.duration.average =
    (this.duration.min_duration + this.duration.max_duration) / 2;
  next();
});

module.exports = mongoose.model("Activity", activitiesSchema, "activities");
