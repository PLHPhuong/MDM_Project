const mongoose = require("mongoose");
const actDetailSchema = mongoose.Schema(
  {
    pick_up_included: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      required: [true, "Missing description field"],
    },
    included: {
      type: [String],
    },
    not_included: {
      type: [String],
    },
    accessibility: {
      type: [String],
    },
    health_safety: {
      type: [String],
    },
    languages: {
      type: [String],
      required: [true, `Missing languages field`],
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
                  return v > 0;
                },
                message: (props) =>
                  `ticket.[ticket_type].price need to be greater than 0`,
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

module.exports = mongoose.model(
  "ActDetail",
  actDetailSchema,
  "activity_detail"
);
