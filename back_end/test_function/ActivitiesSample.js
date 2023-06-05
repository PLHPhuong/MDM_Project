// const mongoose = require("mongoose");
const Activity = require("../models/activitiesModel");
const sample = require("../test_function/sample");
const activities_sample_data = sample.activities

addSample = async () => {
  // console.log(await Activity.countDocuments())
  await Activity.countDocuments().then(async (count) => {
    if (count <= 0) {
      await Activity.insertMany(activities_sample_data);
      console.log("Sample data created successfully");
    }
  });
};

module.exports = addSample;

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
