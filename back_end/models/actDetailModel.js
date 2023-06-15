const mongoose = require("mongoose");
const Activity = require("./activitiesModel");
const actDetailSchema = mongoose.Schema(
  {
    pick_up_included: {
      type: Boolean,
      default: false,
    },
    refundable: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: [true, "Missing description field"],
    },
    included: {
      type: [String],
      // default: [],
    },
    not_included: {
      type: [String],
      // default: [],
    },
    accessibility: {
      type: [String],
      // default: [],
    },
    health_safety: {
      type: [String],
      // default: [],
    },
    whyvisit: {
      type: [String],
      // default: [],
    },
    restriction: {
      type: [String],
      // default: [],
    },
    languages: {
      type: [String],
      // required: [true, `Missing languages field`],
    },
    additional_information: {
      type: String,
    },
    location_departure: {
      type: String,
      required: [true, "Missing location_departure field"],
    },
    location_end: {
      type: String,
    },
    itinerary_stops: {
      type: [
        {
          name: {
            type: String,
            required: [true, "Missing stops.name field"],
          },
          admission_ticket: {
            type: Boolean,
            default: false,
          },
          description: {
            type: String,
            required: [true, "Missing stops.description field"],
          },
          duration: {
            // hours
            type: Number,
            validate: {
              validator: function (v) {
                return v > 0;
              },
              message: (props) =>
                `itinerary.[stops].duration need to be greater than 0`,
            },
          },
        },
      ],
    },
    available: {
      type: [
        {
          start: {
            type: Date,
            required: [true, "Missing ticket.[open].start field"],
          },
          end: {
            type: Date,
            required: [true, "Missing ticket.[open].end field"],
            validate: {
              validator: function (value) {
                return value > this.start;
              },
              message:
                "available.[].end date must be greater than available.[].end date.",
            },
          },
        },
      ],
      required: [true, "Missing available field"],
    },
    ticket: {
      select_time: {
        type: [
          {
            type: String,
            validate: {
              validator: function (v) {
                return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
              },
              message: (props) =>
                `ticket.[select_time]. need to has format 00:00 -> 23:59`,
            },
            required: [true, "ticket.[select_time]. field"],
          },
        ],
      },
      ticket_type: {
        type: [
          {
            _id: {
              type: mongoose.Schema.Types.ObjectId,
              auto: true,
            },
            name: {
              type: String,
              required: [true, "ticket.[ticket_type].name field"],
            },
            people_per_ticket: {
              type: Number,
              min: 1,
              default: 1,
              required: [true, "ticket.[ticket_type].people_per_ticket field"],
            },
            price: {
              type: Number,
              validate: {
                validator: function (v) {
                  return v >= 0;
                },
                message: (props) =>
                  `ticket.[ticket_type].price need to be greater than or equal to 0`,
              },
              required: [true, "missing ticket.[ticket_type].price field"],
            },
          },
        ],
      },
    },
  },
  { timestamps: true }
);
const fFilterActDetaiChanges = function (object) {
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
    "accessibility",
    "health_safety",
    "whyvisit",
    "restriction",
    "languages",
    "additional_information",
    "location_departure",
    "location_end",
    "itinerary_stops",
    "available",
    "ticket",
  ]);
  if (result["itinerary_stops"]) {
    for (index in result["itinerary_stops"]) {
      result["itinerary_stops"][index] = filterObjectByKeys(
        result["itinerary_stops"][index],
        ["name", "admission_ticket", "description", "duration"]
      );
    }
  }
  if (result["available"]) {
    for (index in result["available"]) {
      result["available"][index] = filterObjectByKeys(
        result["available"][index],
        ["start", "end"]
      );
    }
  }

  if (result["ticket"]) {
    result["ticket"] = filterObjectByKeys(result["ticket"], [
      "select_time",
      "ticket_type",
    ]);
  }
  if (result["ticket"] && result["ticket"]["ticket_type"]) {
    for (index in result["ticket"]["ticket_type"]) {
      result["ticket"]["ticket_type"][index] = filterObjectByKeys(
        result["ticket"]["ticket_type"][index],
        ["name", "people_per_ticket", "price"]
      );
    }
  }

  return result;
};
actDetailSchema.pre("save", async function (next) {
  // calculate average_cost
  ticket_type = newInfo.ticket.ticket_type;
  let sumPrice = ticket_type.reduce(
    (acc, ticketType) => acc + ticketType.price,
    0
  );
  await Activity.findOneAndUpdate(
    { detail: this._id },
    { average_cost: sumPrice / ticket_type.length }
  );
  next();
});

actDetailSchema.pre("findOneAndUpdate", async function (next) {
  const newInfo = fFilterActDetaiChanges(this.getUpdate());
  // Update date average cost

  if (newInfo.ticket && newInfo.ticket.ticket_type) {
    ticket_type = newInfo.ticket.ticket_type;
    let sumPrice = ticket_type.reduce(
      (acc, ticketType) => acc + ticketType.price,
      0
    );
    const curActDetail = await this.model.findOne(this.getQuery());

    const temp = await Activity.findOneAndUpdate(
      { detail: curActDetail._id },
      { average_cost: sumPrice / ticket_type.length },
      { new: true }
    );
  }

  // // check if owner exist
  // if (newInfo.owner && !(await User.findById(newInfo.owner))) {
  //   // this.invalidate("owner", "owner is not existed");
  //   return next(new Error("Validation error: owner is not existed"));
  // }

  // // check detail exist
  // if (newInfo.detail && !(await ActDetail.findById(newInfo.detail))) {
  //   // this.invalidate("detail", "detail is not existed");
  //   return next(new Error("Validation error: detail is not existed"));
  // }
  // // update duration.average
  // if (newInfo.duration) {
  //   const { min_duration, max_duration } = newInfo.duration;
  //   if (!min_duration || !max_duration) {
  //     const current_value = await this.model.findOne(this.getQuery());

  //     min_duration = min_duration || current_value.duration.min_duration
  //     max_duration = max_duration || current_value.duration.max_duration
  //   }

  //   this._update.duration.average = (min_duration+max_duration)/2
  // }
  next();
});

module.exports = mongoose.model(
  "ActDetail",
  actDetailSchema,
  "activity_detail"
);
