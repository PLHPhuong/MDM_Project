const mongoose = require("mongoose");
// const ActDetail = require("./actDetailModel");
const User = require("./userModel");
// const PurchaseTicket=require("./purchaseTicketModel")

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
    country: {
      type: String,
      // required: [true, "Missing country field"],
    },
    continent: {
      type: String,
      required: [true, "Missing continent field"],
    },
    detail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ActDetail",
    },
    average_cost: {
      type: Number,
      default: 0,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ticket_sales: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "PurchaseTicket" }],
      default: [],
    },
  },
  { timestamps: true }
);
// resused function
const fFilterActivitiesChanges = function (object) {
  let result = object;
  function filterObjectByKeys(obj, keys) {
    const filteredKeys = Object.keys(obj).filter((key) => keys.includes(key));
    const filteredObject = {};
    filteredKeys.forEach((key) => {
      filteredObject[key] = obj[key];
    });

    return filteredObject;
  }
  result = filterObjectByKeys(result, [
    "name",
    "short_description",
    "image",
    "duration",
    "free_cancellation_available",
    "city",
    "country",
    "continent",
    "detail",
    "owner",
  ]);

  if (result["duration"]) {
    result["duration"] = filterObjectByKeys(result["duration"], [
      "min_duration",
      "max_duration",
    ]);
  }
  return result;
};
activitiesSchema.pre("save", async function (next) {
  // check owner exist
  const owner = await User.findById(this.owner);
  if (this.owner && !owner) {
    this.invalidate("owner", "owner is not existed");
    return next(new Error("Validation error: owner is not existed"));
  }
  next();
});

activitiesSchema.post("save", async function (next) {
  const owner = await User.findById(this.owner);
  owner.activities.push(this._id);
  await owner.save();
});

activitiesSchema.pre("findOneAndUpdate", async function (next) {
  const newInfo = fFilterActivitiesChanges(this.getUpdate());

  // check if owner exist
  if (newInfo.owner && !(await User.findById(newInfo.owner))) {
    // this.invalidate("owner", "owner is not existed");
    return next(new Error("Validation error: owner is not existed"));
  }

  // update duration.average
  if (newInfo.duration) {
    const { min_duration, max_duration } = newInfo.duration;
    if (!min_duration || !max_duration) {
      const current_value = await this.model.findOne(this.getQuery());

      min_duration = min_duration || current_value.duration.min_duration;
      max_duration = max_duration || current_value.duration.max_duration;
    }

    this._update.duration.average = (min_duration + max_duration) / 2;
  }
  next();
});

module.exports = mongoose.model("Activity", activitiesSchema, "activities");

// --------------- Not useed command -------------------
// In pre('save')
// // check ticket_sales exist
// if (this.ticket_sales && this.ticket_sales.length > 0){
//   const found = await PurchaseTicket.find({_id:{$in:this.ticket_sales}})
//   if (found.length != this.ticket_sales.length){
//     const missing = this.ticket_sales.filters(item => !found.includes(item))
//     this.invalidate('ticket_sales', `ticket_sales: ${missing.join(' ')} is not existed`);
//     return next(new Error('Validation error'));
//   }
// }

// // check detail exist & calculate average_cost
// const detail = await ActDetail.findById(this.detail);
// if (!detail && this.detail) {
//   this.invalidate("detail", "detail is not existed");
//   return next(new Error("Validation error"));
// }
// ticket_type = detail.ticket.ticket_type;
// let sumPrice = ticket_type.reduce(
//   (acc, ticketType) => acc + ticketType.price,
//   0
// );
// this.average_cost = sumPrice / detail.ticket.ticket_type.length;

// // calculate average duration
// this.duration.average =
//   (this.duration.min_duration + this.duration.max_duration) / 2;

// // check detail exist
// if (newInfo.detail && !(await ActDetail.findById(newInfo.detail))) {
//   // this.invalidate("detail", "detail is not existed");
//   return next(new Error("Validation error: detail is not existed"));
// }
