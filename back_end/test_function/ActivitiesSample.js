const mongoose = require("mongoose");
const sample = require("./sample_data");
const Activity = require("../models/activitiesModel");
const ActDetail = require("../models/actDetailModel");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const HashingPassword = async (accounts) => {
  for (account of accounts) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(account.password, salt);
    account.password = hashedPassword;
  }
  return accounts;
};
// const test = () => {
//   const hash = HashingPassword(sample.account)
//   Promise.all([hash]).then(([accounts]) => console.log(accounts))
// };

const AddAttraction = async () => {
  PreExecute = [
    Activity.countDocuments(),
    ActDetail.countDocuments(),
    User.find({
      email: { $in: sample.account.map((field) => field.email) },
    }),
  ];
  if (sample.account_is_hashed == false) {
    PreExecute.push(HashingPassword(sample.account));
    sample.account_is_hashed = true;
  }
  const combinedPromise = Promise.all(PreExecute)
    .then(async ([ActivityCount, ActDetailCount, Accounts]) => {
      if (ActivityCount <= 0 && ActDetailCount <= 0 && Accounts.length <= 0) {
      console.log('Adding sample data')
        const createdUser = await User.create(sample.account);
        const userIds = createdUser.map((user) => user._id);
        for (attraction of sample.attraction) {
          let randomIndex = Math.floor(Math.random() * userIds.length);
          attraction.owner = userIds[randomIndex];
        }
        const createdActDetail = await ActDetail.create(sample.attraction)
        for (index in sample.attraction) {
          sample.attraction[index].detail = createdActDetail[index]._id
        }
        await Activity.create(sample.attraction)
        console.log('Insert sample data successfull')
      }
    })
    .catch((error) => console.log(error));
};
module.exports = { AddAttraction };
// const mongoose = require("mongoose");
// const Activity = require("../models/activitiesModel");
// const sample = require("./sample");
// const activities_sample_data = sample.activities

// addSampleActivity = async () => {
//   // console.log(await Activity.countDocuments())
//   await Activity.countDocuments().then(async (count) => {
//     if (count <= 0) {
//       await Activity.insertMany(activities_sample_data);
//       console.log("Sample data created successfully");
//     }
//   });
// };

// module.exports = {addSampleActivity };

// name: ``,
// short_description: ``,
// rating: ,
// image: [],
// free_cancellation_available: ,
// pick_up_included: ,
// description: ``,
// included: [],
// not_included: [],
// accessibility: [],
// health_safety: [],
// languages: [],
// additional_information: ``,
// itinerary: {
//     min_duration: ,
//     max_duration: ,
//     stops: [
//         {
//             name: ``,
//             admission_ticket: ,
//             description: ``,
//             duration: ,
//         },
//     ],
//     location_departure: ``,
//     location_end: ``,
// },
// ticket: {
//     open: [{start: ``, end: ``}],
//     select_time: [],
//     type: [
//       {
//         name:
//         people_per_ticket: ,
//         price:,
//       }
//     ]
//   },

// {
//   name: "",
//   short_description:
//     "",
//   rating: ,
//   image: [
//     "",
//   ],
//   free_cancellation_available: true,
//   pick_up_included: true,
//   description: ``,
//   included: [``, ``],
//   not_included: [``],
//   accessibility: [
//     ``,

//   ],
//   health_safety: [``],
//   languages: [``],
//   additional_information: ``,
//   itinerary: {
//     min_duration: ,
//     max_duration: ,
//     stops: [
//       {
//         name: "",
//         admission_ticket: ,
//         description: ``,
//         duration: ,
//       },
//     ],
//   },
//   location_departure: ``,
//   location_end: "",
//   ticket: {
//     open: [{ start: "2023-06-01", end: "2023-09-01"},],
//     select_time: [

//     ],
//     ticket_type: [
//       {
//         name: ,
//         people_per_ticket: ,
//         price: ,
//       }
//     ]
//   },
// },
