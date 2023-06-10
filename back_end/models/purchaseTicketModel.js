const mongoose = require("mongoose");
const Activity = require("./activitiesModel");
const ActDetail = require("./actDetailModel");

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
      required: [true, "ticket.[select_time]. field"],
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
  },
  { timestamps: true }
);

purchaseTicketSchema.pre("save", function (next) {
  this.total = this.tickets.reduce((acc, ticket) => {
    const ticketPrice = ticket.price * ticket.amount;
    return acc + ticketPrice;
  }, 0);
  next();
});

purchaseTicketSchema.pre('validate', async function (next) {
  const activity = await Activity.findById(this.activities);
  if (!activity) {
    this.invalidate('tickets', `activity does not exist in activities`);
    next();
  }
  const tickets = await ActDetail.findById(activity.detail)
  tickettype = tickets.ticket.ticket_type

  this.tickets.forEach((ticket,index) => {
    const found = tickettype.find((t) => t._id.equals(ticket._id));
    if (!found) {
      this.invalidate('tickets', `tickets[${index}]._id does not exist in activities detail`);
    }
  });
  next();
});
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

module.exports = mongoose.model(
  "purchaseTicket",
  purchaseTicketSchema,
  "purchase_ticket"
);
