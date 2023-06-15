const mongoose = require("mongoose");
const Activity = require("./activitiesModel");
const ActDetail = require("./actDetailModel");
const User = require("./userModel");
const purchaseTicketSchema = mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "missing buyer field"],
    },
    activities: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
      required: [true, "missing activities field"],
    },
    select_time: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
        },
        message: (props) =>
          `ticket.select_time. need to has format 00:00 -> 23:59`,
      },
      required: [true, "ticket.[select_time].field"],
    },
    happen_on_date: {
      type: Date,
      required: [true, "Missing happen_on_date field"],
    },
    tickets: {
      type: [
        {
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "missing tickets.[]._id field"],
            // validate: {
            //   validator: async function (v) {
            //     activity = await Activity.findById(this.activities)
            //     console.log(this)
            //     // ticket = await ActDetail.findById(Activity.detail)
            //     // tickettype = ticket.detail.ticket.ticket_type;
            //     return  true ;
            //   },
            //   message: (props) => `_id not exist in activities`,
            // },
          },
          name: {
            type: String,
            required: [true, "ticket.[].name field"],
          },
          people_per_ticket: {
            type: Number,
            min: 1,
            default: 1,
            required: [true, "ticket.[].people_per_ticket field"],
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
            required: [true, "missing ticket.[].price field"],
          },
          amount: {
            type: Number,
            min: 1,
            default: 1,
            required: [true, "ticket.[].people_per_ticket field"],
          },
        },
      ],
      required: [true, "missing field"],
    },
    total: {
      type: Number,
      default: 0,
    },
    cancel_request: {
      type: Boolean,
      default: false,
    },
    is_cancel: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

purchaseTicketSchema.pre("save", async function (next) {
  // check if buyer exist
  const user = await User.findById(this.buyer);
  if (!user) {
    this.invalidate("buyer", `buyer does not exist in user`);
    return next(new Error("Validation error: buyer does not exist in user"));
  }

  // check if select_time is existed in tickets
  const activity = await Activity.findById(this.activities);
  const tickets = await ActDetail.findById(activity.detail);
  if (!tickets.ticket.select_time.includes(this.select_time)) {
    this.invalidate("select_time", `select_time does not exist in activities`);
    return next(
      new Error("Validation error: select_time does not exist in activities")
    );
  }
  // check if happen_on_date is existed between available date
  let check_happen_on_date = false;
  const check_date = new Date(this.happen_on_date);
  for (const period of tickets.available) {
    const start = new Date(period.start);
    const end = new Date(period.end);
    if (check_date >= start && check_date <= end) {
      check_happen_on_date = true;
      break;
    }
  }
  if (!check_happen_on_date) {
    this.invalidate(
      "happen_on_date",
      `happen_on_date does not exist in activities`
    );
    return next(
      new Error(
        "Validation error: happen_on_date does not fall in the available period in activities"
      )
    );
  }
  // Get total price
  this.total = this.tickets.reduce((acc, ticket) => {
    const ticketPrice = ticket.price * ticket.amount;
    return acc + ticketPrice;
  }, 0);

  // push purchase to user tickets, and ticket sale
  user.tickets.push(this._id);
  activity.ticket_sales.push(this._id);

  await user.save();
  await activity.save();
  next();
});

purchaseTicketSchema.pre("validate", async function (next) {
  const activity = await Activity.findById(this.activities);
  if (!activity) {
    this.invalidate("tickets", `activity does not exist in activities`);
    return next(
      new Error("Validation error: activity does not exist in activities")
    );
  }
  const tickets = await ActDetail.findById(activity.detail);
  tickettype = tickets.ticket.ticket_type;

  this.tickets.forEach((ticket, index) => {
    const found = tickettype.find((t) => t._id.equals(ticket._id));
    if (!found) {
      this.invalidate(
        "tickets",
        `tickets[${index}]._id does not exist in activities detail`
      );
    }
  });
  next();
});

purchaseTicketSchema.pre("delete", async function (next) {
  const user = await User.findById(this.buyer);
  const activity = await Activity.findById(this.activities);

  // remove purchase to user tickets, and ticket sale
  let index = user.tickets.indexOf(this._id);
  if (index !== -1) user.tickets.splice(index, 1);
  index = activity.ticket_sales.indexOf(this._id);
  if (index !== -1) activity.ticket_sales.splice(index, 1);

  await user.save();
  await activity.save();
  next();
});

module.exports = mongoose.model(
  "PurchaseTicket",
  purchaseTicketSchema,
  "purchase_ticket"
);

// -------------------------------------- not used ------------------------------------
// purchaseTicketSchema.pre("validate", async function (next) {
//   activity = await this.populate("activities");
//   ticket = await activity.populate("detail");
//   tickettype = ticket.detail.ticket.ticket_type;
//   console.log(1)
//   const errors = [];
//   this.tickets.forEach((t, index) => {
//     const found = tickettype.find((v) => v._id.toString() === t._id.toString());
//     if (!found) errors.push(`tickets[${index}]._id: Invalid ticket ID`);
//   });

//   if (errors.length > 0) {
//     const validationError = new mongoose.Error.ValidationError();
//     validationError.errors = errors;
//     next(validationError);
//   } else {
//     next();
//   }

//   this.next();
// });
// purchaseTicketSchema.pre("save", async (next) => {
//   const activity = await RefModel.findById(this.refField);
//   if (!refInstance) {
//     const error = new Error("Referenced element does not exist.");
//     return next(error);
//   }
//   next();
// });
