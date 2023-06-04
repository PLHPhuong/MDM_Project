const mongoose = require("mongoose");

// regex_timeformat = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
// console.log(regex_settimeformat.test("01:00"));
// references for attribute:  https://www.booking.com/attractions/vn/pr7rasvmt1cp-guided-city-sightseeing-walking-tour.html?aid=304142&label=gen173nr-1FCBkoggI46AdIM1gEaPQBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuALQ6rGjBsACAdICJDI5NWEzMDc1LWU1ZDAtNDcwMC05N2YxLTZjNjNkYjU0NjJkNdgCBeACAQ&source=searchresults-product-card&ufi=-3714993&date=2023-07-01&tickets=TOw5NodqFIka%3A1&start_time=08%3A00&ticket_type=OFtyvaXGLrAA

const activitiesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Missing name field"],
    },
    short_description: {
      type: String,
      required: [true, "Missing name field"],
    },
    rating: {
      type: Number,
      min: [0, "Less than min value which is 0"],
      max: [5, "Less than min value which is 5"],
      default: 0,
    },
    free_cancellation_available: {
      type: Boolean,
      default: true,
    },
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
    itinerary: {
      duration: {
        // hours
        start: {
          type: Number,
          validate: {
            validator: function (v) {
              return v > 0;
            },
            message: (props) =>
              `itinerary.duration.start need to be greater than 0`,
          },
          required: [true, `Missing itinerary.duration.start field`],
        },
        end: {
          type: Number,
          validate: {
            validator: function (v) {
              return v > this.itinerary.duration.start;
            },
            message: (props) =>
              `itinerary.duration.end need to be greater or equal to than itinerary.duration.start`,
          },
          required: [true, `Missing itinerary.duration.end field`],
        },
      },
      stops: [
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
    location: {
      departure: {
        location: {
          type: String,
          required: [true, "Missing location.departure.location field"],
        },
      },
      end: {
        location: {
          type: String,
          required: [true, "Missing location.departure.location field"],
        },
      },
    },
    ticket: {
      open: [
        {
          start: {
            type: Date,
            required: [true, "Missing ticket.[open].start field"],
          },
          end: {
            type: Date,
            required: [true, "Missing ticket.[open].end field"],
          },
        },
      ],
      select_time: { 
        type: [String],
        validate: {
          validator: function (v) {
            return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
          },
          message: (props) =>
            `select_time ticket.[select_time]. need to has format 00:00 -> 23:59`,
        },
        required: [true, "select_time ticket.[select_time]. field"]
      },
      max_number_of_people:
      { 
        type: Number,
        min: 1,
        default: 1,
        required: [true, "ticket.[language] field"]
      },
      price:{
        max_number_of_people:
        { 
          type: Number,
          validate: {
            validator: function (v) {
              return v > 0;
            },
            message: (props) =>
              `ticket.price need to be greater than 0`,
          },
          required: [true, "ticket.price field"]
        },
      }
    },
  },
  { timestamps: true }
);
